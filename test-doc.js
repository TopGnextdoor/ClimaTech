import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCxVkSVoliqVaZLdSGbIbe_Lg9L_GL0OFo',
  authDomain: 'climatech-c7392.firebaseapp.com',
  projectId: 'climatech-c7392',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkDoc() {
  try {
    const uid = 'peNUsuZS3ITtrLfe67FHSdc6Rrk2';
    console.log("Fetching user doc for UID:", uid);
    const snap = await getDoc(doc(db, 'users', uid));
    if (snap.exists()) {
      console.log('Doc exists!', snap.data());
    } else {
      console.log('Doc does NOT exist for this UID. This means the user has no role assigned.');
    }
  } catch (err) {
    console.error('Error fetching doc:', err.message);
  } finally {
    process.exit(0);
  }
}

checkDoc();
