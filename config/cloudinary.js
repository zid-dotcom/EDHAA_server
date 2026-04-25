
const  cloudinary=require('cloudinary').v2


const  connectCloudinary=async()=>{
    cloudinary.config({
        cloud_name:process.env.Cloudinary_name,
        api_key:process.env.Cloudinary_API_KEY,
        api_secret:process.env.cloudinary_API_secret
        
    })
}


module.exports=connectCloudinary





