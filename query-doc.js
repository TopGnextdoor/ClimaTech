import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCxVkSVoliqVaZLdSGbIbe_Lg9L_GL0OFo',
  authDomain: 'climatech-c7392.firebaseapp.com',
  projectId: 'climatech-c7392',
  storageBucket: 'climatech-c7392.firebasestorage.app',
  messagingSenderId: '89676403864',
  appId: '1:89676403864:web:e72b78ba941fa406f66ced'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function test() {
  try {
    console.log("Fetching specific user doc...");
    const snap = await getDoc(doc(db, 'users', 'abc@gmail.com'));
    if (snap.exists()) {
      console.log('Doc exists!', snap.data());
    } else {
      console.log('Doc does not exist. (No permission error though!)');
    }
  } catch (err) {
    console.error('Error fetching doc:', err.message);
  }
}

test().then(() => {
  setTimeout(() => process.exit(0), 1000);
});
