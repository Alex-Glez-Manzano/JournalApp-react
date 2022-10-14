
import { async } from "@firebase/util";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload } from "../../helpers";
import { loadNotes } from "../../helpers/loadNotes";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";

// despacha acciones asincronas(salir de la app y llegar a firebase)
export const startNewNote = () =>{
    return async(dispatch, getState)=>{
        dispatch(savingNewNote());
        const {uid} = getState().auth;
        //uid: para grabar en fireBase

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }
        const newDoc =  doc(collection(FirebaseDB, `${uid}/journal/notes`));
        // const setDocResp = await setDoc(newDoc, newNote);
        await setDoc(newDoc, newNote);
        newNote.id = newDoc.id;
       
        //dispatch
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));

        // dispath de la nueva Nota 
        // dispar activar nota
    }
}
export const startLoadingNotes = () =>{
    return async (dispatch, getState) =>{
        const {uid} = getState().auth;
        if(!uid)throw new Error('El UID del usuario no existe');
        // console.log({uid})
        const notes =await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const startSaveNote= () => {
    return async(dispatch, getState)=>{
        dispatch(setSaving());
        // apuntar al documento a actualizar
        const {uid} = getState().auth;
        const {active:note} = getState().journal;
        const noteToFireStore = {...note};
        // eliminar la propiedad de un objeto JS
        delete noteToFireStore.id;
        
        //referencia al documento a actualizar
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        //referencia al documento, datos a enviar, union:si existen campos que no habia se mantienen
        await setDoc(docRef, noteToFireStore, {merge:true});
        dispatch(updateNote(note));
    }
}
export const startUploadingFiles = (files = [])=>{
    return async(dispatch)=>{
        dispatch(setSaving());    
        //subir(postman usar)
        //await fileUpload(files[0]);
        const fileUploadPromises = [];
        for(const file of files){
            fileUploadPromises.push(fileUpload(file))
        }
       const photosUrls = await Promise.all(fileUploadPromises);
       dispatch(setPhotosToActiveNote(photosUrls));
    }
}
export const startDeletingNote = ()=>{
    return async(dispatch, getState)=>{
        const {uid} = getState().auth;
        const {active:note} = getState().journal;
        
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await deleteDoc(docRef);
        dispatch(deleteNoteById(note.id));

    }
}