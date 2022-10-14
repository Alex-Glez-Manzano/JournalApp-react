export const fileUpload = async(file)=>{
    if(!file)throw new Error('No existe ningun archivo para subir');
    const cloudURL = 'https://api.cloudinary.com/v1_1/dxcbda8dl/upload?';
    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);
    try{
        const resp = await fetch(cloudURL, {
            method: 'POST',
            body: formData
        });
        
        console.log(resp);
        if(!resp.ok)throw new Error('Error al subir imagen')
        const cloudResp = await resp.json();
        
        return cloudResp.secure_url;
    }catch(error){
        console.log(error);
        throw new Error(error.message);
    }
}