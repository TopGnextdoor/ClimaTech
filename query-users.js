import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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
    console.log("Fetching users...");
    const qSnapshot = await getDocs(collection(db, 'users'));
    let count = 0;
    qSnapshot.forEach((doc) => {
      console.log(doc.id, '=>', JSON.stringify(doc.data()));
      count++;
    });
    console.log(`Total users: ${count}`);
  } catch (err) {
    console.error('Error fetching users:', err.message);
  } finally {
    process.exit(0);
  }
}

test();
