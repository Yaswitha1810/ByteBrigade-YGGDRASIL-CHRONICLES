const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.LOUDINARY_SECRET_KEY,

});

const cloudinaryUploading =async(fileToUpload) =>{
try{
    const data=await cloudinary.Uploader.upload(fileToUpload,{
        resource_type:"auto",

    });
    return {
        url: data?.secure_url,
    }

}catch(error){
    return error;
}
};

module.exports = cloudinaryUploadImg;