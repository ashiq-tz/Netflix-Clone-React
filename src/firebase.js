// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import {addDoc, collection, getFirestore} from 'firebase/firestore'
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAasJMzGE_CFMYIe_wrRVPO7NNXjnrohgE",
  authDomain: "netflix-clone-52509.firebaseapp.com",
  projectId: "netflix-clone-52509",
  storageBucket: "netflix-clone-52509.firebasestorage.app",
  messagingSenderId: "1051308426093",
  appId: "1:1051308426093:web:66fa13ccace662ce685064"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//
const auth = getAuth(app)
const db = getFirestore(app)

const signUp = async (name,email,password) => {
    try {
       const res = await createUserWithEmailAndPassword(auth,email,password)
       const user = res.user
       await addDoc(collection(db, "user"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email
       })
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split("-").join(" "))
    }
}

const login = async (email,password) => {
    try {
        await signInWithEmailAndPassword (auth,email,password)        
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split("-").join(" "))
    }
}

const logout = async () => {
    signOut(auth)
}

export {auth,db,signUp,login,logout}