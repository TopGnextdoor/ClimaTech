import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

const AuthContext = createContext(null);

const ROLE_CACHE_KEY = 'ct_user_role';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole]   = useState(() => localStorage.getItem(ROLE_CACHE_KEY) || null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setLoading(false); // ← unblock UI immediately

        // Hydrate role from cache first, then verify from Firestore
        const cached = localStorage.getItem(ROLE_CACHE_KEY);
        if (cached) setRole(cached);

        // Background verify / update from Firestore
        getDoc(doc(db, 'users', firebaseUser.uid))
          .then((snap) => {
            if (snap.exists()) {
              const r = snap.data().role;
              setRole(r);
              localStorage.setItem(ROLE_CACHE_KEY, r);
            } else {
              // FIX: Legacy accounts might exist in Auth but missing Firestore document.
              // Assign a default role, create document, and unblock routing.
              const defaultRole = 'startup';
              setDoc(doc(db, 'users', firebaseUser.uid), {
                email: firebaseUser.email,
                role: defaultRole,
                createdAt: new Date().toISOString()
              }).catch(err => console.error('Failed to create missing role doc:', err));
              
              setRole(defaultRole);
              localStorage.setItem(ROLE_CACHE_KEY, defaultRole);
            }
          })
          .catch((err) => {
            console.error('Role fetch error:', err);
            // ROBUST FALLBACK: If Firestore is offline, permission denied, or fails,
            // we MUST assign a role to unblock the UI routing, otherwise they are trapped
            // on the login screen forever despite successful Firebase Authentication.
            if (!cached) {
               const defaultRole = 'startup';
               setRole(defaultRole);
               localStorage.setItem(ROLE_CACHE_KEY, defaultRole);
            }
          });
      } else {
        // Logged out — clear everything
        setUser(null);
        setRole(null);
        localStorage.removeItem(ROLE_CACHE_KEY);
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  const signup = async (email, password, name, org, selectedRole) => {
    setAuthError('');
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', result.user.uid), {
        email, name, org,
        role: selectedRole,
        createdAt: new Date().toISOString()
      });
      setRole(selectedRole);
      localStorage.setItem(ROLE_CACHE_KEY, selectedRole);
      return { success: true };
    } catch (err) {
      const msg =
        err.code === 'auth/email-already-in-use'
          ? 'This email is already registered. Please sign in.'
          : err.code === 'auth/weak-password'
          ? 'Password must be at least 6 characters.'
          : 'Signup failed. Please try again.';
      setAuthError(msg);
      return { success: false, error: msg };
    }
  };

  const signin = async (email, password) => {
    setAuthError('');
    try {
      // Only one network call — Firebase Auth.
      // Role comes from localStorage (instant if they've logged in before)
      // or from onAuthStateChanged background fetch for first-time logins.
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (err) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        // Fallback: Check if this is a legacy account stored only in Firestore 'users' collection
        try {
          const usersRef = collection(db, 'users');
          const q = query(usersRef, where('email', '==', email), where('password', '==', password));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            // Found a matching legacy account
            const legacyDoc = querySnapshot.docs[0];
            const legacyData = legacyDoc.data();
            const legacyId = legacyDoc.id;

            // Migrate to Firebase Auth
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const newUid = result.user.uid;

            // Copy data to new UID
            const newUserData = {
              email: legacyData.email,
              name: legacyData.name || '',
              org: legacyData.org || '',
              role: legacyData.role || 'startup', // default role
              createdAt: legacyData.createdAt || new Date().toISOString()
            };
            
            await setDoc(doc(db, 'users', newUid), newUserData);

            // Delete legacy document if the ID is different from the new UID
            if (legacyId !== newUid) {
              await deleteDoc(doc(db, 'users', legacyId));
            }

            // Update local state
            setRole(newUserData.role);
            localStorage.setItem(ROLE_CACHE_KEY, newUserData.role);
            
            return { success: true };
          }
        } catch (fallbackErr) {
          console.error('Legacy migration error:', fallbackErr);
        }
      }

      const msg =
        err.code === 'auth/user-not-found' ||
        err.code === 'auth/wrong-password' ||
        err.code === 'auth/invalid-credential'
          ? 'Invalid email or password.'
          : `Sign in failed (${err.code}). Please try again.`;
      setAuthError(msg);
      return { success: false, error: msg };
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setRole(null);
    localStorage.removeItem(ROLE_CACHE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, authError, setAuthError, signup, signin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
