import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCxVkSVoliqVaZLdSGbIbe_Lg9L_GL0OFo',
  authDomain: 'climatech-c7392.firebaseapp.com',
  projectId: 'climatech-c7392',
  storageBucket: 'climatech-c7392.firebasestorage.app',
  messagingSenderId: '89676403864',
  appId: '1:89676403864:web:e72b78ba941fa406f66ced'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
