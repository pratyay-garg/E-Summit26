import { createContext, useContext, useState ,useEffect } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { app } from '../lib/firebase';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import toast from "react-hot-toast";


const auth = getAuth(app);
const db = getFirestore(app);

const AuthUserContext = createContext({
    authUser: null,
    loading: true,
    signInwithEmail: async () => { },
    signInwithGoogle: async () => { },
    signUpwithEmail: async () => { },
    signOutUser: async () => { },

});


export function AuthUserProvider({ children }) {
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);

     useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);


    const signInwithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        return await signInWithPopup(auth, provider);
    }

    const signOutUser = async () => {
        return await signOut(auth);
    }

    const signUpwithEmail = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setAuthUser(userCredential.user);
            return userCredential;
        } catch (error) {
            console.error(error);
            toast.error(error);
            return null;
        }
    }
    const signInwithEmail = (email, password) => {
        try {
            const userCredential = signInWithEmailAndPassword(auth, email, password);
            setAuthUser(userCredential.user);
            return userCredential;
        } catch (error) {
            console.error(error);
            toast.error(error);
            return null;
        }
    }

    return (
        <AuthUserContext.Provider value={{ authUser, loading, signInwithEmail, signInwithGoogle, signOutUser, signUpwithEmail }} >
            {children}
        </AuthUserContext.Provider>
    );
}


export const useAuth = () => useContext(AuthUserContext);