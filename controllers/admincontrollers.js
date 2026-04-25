  
 const newsModel=require('../model/News')
 const cloudinary=require('cloudinary').v2

 const jwt=require('jsonwebtoken')



// Api for admin login 

exports.AdminLogin=async(req,res)=>{
    try{
        const {email,password}=req.body

        if(process.env.Admin_Email==email&&process.env.Admin_password==password){
            const token=jwt.sign(email+password,process.env.JWT_SECRET)
            res.status(200).json({token:token})
        }else{
            res.status(406).json('invalid credentials')
        }
 
    }
    catch(err){
        console.log(err);
        res.status(401).json(err)

        
    }
    
}



// Api for add news

exports.addNews=async(req,res)=>{
     try {
    const { title, description } = req.body;

    // Check file exists
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "edhaa_news",
    });

    // Save to DB
    const news = new newsModel({
      title,
      description,
      image: result.secure_url,
    });

    await news.save();

    res.json({
      success: true,
      message: "News added successfully",
      news,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }

    

}




// api get news 

exports.getNews=async(req,res)=>{
    try {
    const news = await newsModel.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      news,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }

}




// api for Delete news


exports.deleteNews=async(req,res)=>{
    try {
    const { id } = req.params;

    await newsModel.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "News deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }

}






  


