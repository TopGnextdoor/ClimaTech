import { initializeApp } from 'firebase/app';
import { getAuth, fetchSignInMethodsForEmail } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCxVkSVoliqVaZLdSGbIbe_Lg9L_GL0OFo',
  authDomain: 'climatech-c7392.firebaseapp.com',
  projectId: 'climatech-c7392',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function test() {
  try {
    const methods = await fetchSignInMethodsForEmail(auth, 'abc@gmail.com');
    console.log("Sign-in methods for abc@gmail.com:", methods);
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    process.exit(0);
  }
}
test();
