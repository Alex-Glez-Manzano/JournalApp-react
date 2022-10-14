import { async } from "@firebase/util";
import { loginWithEmailPassword, logoutFirebase, registrerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../Journal";
import { checkingCredentials, logout, login } from "./authSlice"

// acciones que puedo despachar pero tienen tareas ascincronas
export const chekingAuthentication = () =>{
    return async(dispatch) => {
        dispatch(checkingCredentials());

    }
}
export const startGoogleSignIn = () =>{
    return async (dispatch) =>{
        dispatch(checkingCredentials());
        const result = await signInWithGoogle();
        // console.log({result})
        if (!result.ok) return dispatch(logout(result.errorMessage));

        dispatch(login(result));
    }
}

export const startCreatingUserWithEmailPassword= ({email, password, displayName})=>{
    return async(dispatch)=>{
        dispatch(checkingCredentials());
        // const {ok, uid, photoURL, errorMessage} = await registrerUserWithEmailPassword({email, password, displayName});
        const result = await registrerUserWithEmailPassword({email, password, displayName});
        // console.log(resp);
        if(!result.ok)return dispatch(logout(result.errorMessage));
        // dispatch(login({uid, displayName, email, photoURL}));
        dispatch(login(result));
    }
}

export const startLoginWithEmailPassword= ({email, password})=>{
    return async (dispatch) =>{

        dispatch(checkingCredentials());

        const result = await loginWithEmailPassword({email, password});
        console.log({result});

        if (!result.ok) return dispatch(logout(result));

        dispatch(login(result));
    }
}
export const startLogout= () =>{
    return async(dispatch) =>{
        await logoutFirebase();
        dispatch(clearNotesLogout());
        dispatch(logout());
    }
}