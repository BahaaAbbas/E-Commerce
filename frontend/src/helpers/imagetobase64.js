const imagetobase64 = async (image ) => {
    const filereader = new FileReader();
    filereader.readAsDataURL(image);
    
    const data = await new Promise((resolve,reject)=> {
        filereader.onload = () => resolve(filereader.result);
        filereader.onerror = (err) => reject(err);

    })


    return data;
}

export default imagetobase64;