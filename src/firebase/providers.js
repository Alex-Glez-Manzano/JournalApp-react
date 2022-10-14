
import { async } from "@firebase/util";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() =>{
    try {
        // esto tiene lo necesario de credenciales mas completo
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        /* como obtener las credenciales
         const credentials = GoogleAuthProvider.credentialFromResult(result);
         console.log({credentials});*/
        
        const {displayName, email, photoURL, uid} = result.user;
        // console.log({user})
        return{
            ok: true,
            // User info 
            displayName, email,photoURL,uid
        }
    } catch (error) {
         // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        return {
            ok: false,
            errorMessage
        }
    }
}
// nuevo provedor registrarse con usuario y contraseña(despues crea thunk)
export const registrerUserWithEmailPassword = async ({email, password, displayName})=>{

    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const {uid, photoURL} = resp.user;
        // console.log(resp);
        //TODO: actualizar el displayName en firebase
        await updateProfile( FirebaseAuth.currentUser, {displayName});
        return{
            ok: true,
            uid, photoURL, email, displayName
        }
    } catch (error) {
        
        return {ok: false,
        errorMessage: error.message//podrias mandar un error personalizado
        }
    }
}

export const loginWithEmailPassword = async({email, password}) =>{
    //signINWithEmailandPassword
    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const {uid, photoURL, displayName} = resp.user;
        // console.log(resp);
        return{
            ok: true,
            uid, photoURL, displayName
        }
    } catch (error) {
        
        return {ok: false,
        errorMessage: error.message//podrias mandar un error personalizado
        }
    }
}

// Provider
export const logoutFirebase= async() =>{
    return await FirebaseAuth.signOut();
}