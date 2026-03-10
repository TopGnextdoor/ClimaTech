import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxVkSVoliqVaZLdSGbIbe_Lg9L_GL0OFo",
  authDomain: "climatech-c7392.firebaseapp.com",
  projectId: "climatech-c7392",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function loginAndFetch() {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, "abc@gmail.com", "abc@1234");
    const uid = userCredential.user.uid;
    console.log("Success! Signed in as:", uid);
    
    console.log("Fetching doc:", uid);
    const snap = await getDoc(doc(db, "users", uid));
    if (snap.exists()) {
      console.log("Doc data:", snap.data());
    } else {
      console.log("Doc does NOT exist for this authenticated user.");
    }
  } catch (error) {
    console.error("Operation failed!");
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
  } finally {
    process.exit(0);
  }
}

loginAndFetch();
