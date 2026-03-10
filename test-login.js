import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCxVkSVoliqVaZLdSGbIbe_Lg9L_GL0OFo",
  authDomain: "climatech-c7392.firebaseapp.com",
  projectId: "climatech-c7392",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function login() {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, "abc@gmail.com", "abc@1234");
    console.log("Success! Signed in as:", userCredential.user.uid);
  } catch (error) {
    console.error("Login failed!");
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
  } finally {
    process.exit(0);
  }
}

login();
