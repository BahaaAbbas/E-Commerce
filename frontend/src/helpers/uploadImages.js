

const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`;

const uploadImage = async (image) => {

    const formData = new FormData();
    formData.append('file',image);
    formData.append('upload_preset','BMERN-PRODUCT');

    const fetchData = await fetch(url, {
        method: 'post',
        body: formData
    });

    return fetchData.json();
}

export default uploadImage


