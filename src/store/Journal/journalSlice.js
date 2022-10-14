import { createSlice } from '@reduxjs/toolkit';
export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSave:'',
        notes: [],
        active: null,
        // active:{
        //     id: 'ABC123',
        //     title: '',
        //     body: '',
        //     date: 12345678,
        //     imageUrls: [],//https://foto1.jpg,https://foto2.jpg, https://foto3.jpg
        // }
    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;

        },
        addNewEmptyNote: (state, action)=>{
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        //accion para saber la nota activa
        setActiveNote: (state, action)=>{
            state.active = action.payload;
            state.messageSave = '';
        },
        // carfgar las notas 
        setNotes: (state, action)=>{
            state.notes = action.payload;
        },
        // guardar notas 
        setSaving: (state)=>{
            state.isSaving = true;
            state.messageSave = '';
            //Todo: mensaje de error,...
        },
        // actualizar nota 
        updateNote: (state, action)=>{//payload: note
            //actualizamos la referencia local para ver los cambios
            state.isSaving = false;
            state.notes = state.notes.map(note =>{//barre los elementos del arreglo y regresa lo que especifiques
                if(note.id === action.payload.id){
                    return action.payload;
                }
                return note;
            });
            //TODO: Mostrar mensaje de actualización
            state.messageSave = `La nota: "${action.payload.title}", se actualizo correctamente.`
        },
        setPhotosToActiveNote: (state, action)=>{
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
            state.isSaving = false;
        },
        clearNotesLogout: (state)=>{
            state.isSaving = false;
            state.messageSave= '';
            state.notes = [];
            state.active = null;
        },
        // eliminar nota 
        deleteNoteById: (state, action)=>{
            state.active = null;
            state.notes = state.notes.filter(note => note.id !== action.payload);
        }
    }
});


// Action de los reducer
export const { 
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    clearNotesLogout,
    setPhotosToActiveNote,
    deleteNoteById,
 } = journalSlice.actions;