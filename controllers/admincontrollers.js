  
 const newsModel=require('../model/News')
 const cloudinary=require('cloudinary').v2
 const activityModel = require('../model/Activity')
const academicModel = require('../model/Academic')

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






  /* api for update news */


exports.updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // Find existing news
    const existingNews = await newsModel.findById(id);

    if (!existingNews) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    let imageUrl = existingNews.image;

    // If new image uploaded → update in Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "edhaa_news",
      });

      imageUrl = result.secure_url;
    }

    // Update fields
    const updatedNews = await newsModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        image: imageUrl,
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "News updated successfully",
      news: updatedNews,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};







/* Api for add Activities  */

exports.addActivity = async (req, res) => {
  try {
    const {
      title,
      description,
      activities,
      spotlight,
      events,
      stats
    } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required"
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "edhaa_activity",
    });

    const activity = new activityModel({
      title,
      description,
      image: result.secure_url,

      // 🔥 IMPORTANT (parse JSON)
      activities: activities ? JSON.parse(activities) : [],
      spotlight: spotlight ? JSON.parse(spotlight) : {},
      events: events ? JSON.parse(events) : [],
      stats: stats ? JSON.parse(stats) : [],
    });

    await activity.save();

    res.json({
      success: true,
      message: "Activity added successfully",
      activity,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




/* Api for get activities */

exports.getActivity = async (req, res) => {
  try {
    const activity = await activityModel.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      activity,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};





/* Api for delete activities */

exports.deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;

    await activityModel.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Activity deleted",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




/* Api for update Activities */
exports.updateActivity = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      activities,
      spotlight,
      events,
      stats
    } = req.body;

    const existingActivity = await activityModel.findById(id);

    if (!existingActivity) {
      return res.status(404).json({
        success: false,
        message: "Activity not found",
      });
    }

    let imageUrl = existingActivity.image;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "edhaa_activity",
      });

      imageUrl = result.secure_url;
    }

    const updatedActivity = await activityModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        image: imageUrl,

        // 🔥 keep old data if not sent
        activities: activities ? JSON.parse(activities) : existingActivity.activities,
        spotlight: spotlight ? JSON.parse(spotlight) : existingActivity.spotlight,
        events: events ? JSON.parse(events) : existingActivity.events,
        stats: stats ? JSON.parse(stats) : existingActivity.stats,
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Activity updated successfully",
      activity: updatedActivity,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



/* Api for add academics */

exports.addAcademic = async (req, res) => {
  try {
    const {
      title,
      description,
      levels,
      methodology,
      curriculum,
      results,
      exams
    } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    // upload image
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "edhaa_academic",
    });

    const academic = new academicModel({
      title,
      description,
      image: result.secure_url,

      // 🔥 parse JSON fields (IMPORTANT)
      levels: levels ? JSON.parse(levels) : [],
      methodology: methodology ? JSON.parse(methodology) : [],
      curriculum: curriculum ? JSON.parse(curriculum) : [],
      results: results ? JSON.parse(results) : {},
      exams: exams ? JSON.parse(exams) : [],
    });

    await academic.save();

    res.json({
      success: true,
      message: "Academic added successfully",
      academic,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



/* Api for get Academics  */



exports.getAcademic = async (req, res) => {
  try {
    const academic = await academicModel.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      academic,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};





/* Api for Delete academics */

exports.deleteAcademic = async (req, res) => {
  try {
    const { id } = req.params;

    await academicModel.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Academic deleted",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};





/* Api for update  academics */
exports.updateAcademic = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      levels,
      methodology,
      curriculum,
      results,
      exams
    } = req.body;

    const existingAcademic = await academicModel.findById(id);

    if (!existingAcademic) {
      return res.status(404).json({
        success: false,
        message: "Academic not found",
      });
    }

    let imageUrl = existingAcademic.image;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "edhaa_academic",
      });

      imageUrl = result.secure_url;
    }

    const updatedAcademic = await academicModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        image: imageUrl,

        levels: levels ? JSON.parse(levels) : existingAcademic.levels,
        methodology: methodology ? JSON.parse(methodology) : existingAcademic.methodology,
        curriculum: curriculum ? JSON.parse(curriculum) : existingAcademic.curriculum,
        results: results ? JSON.parse(results) : existingAcademic.results,
        exams: exams ? JSON.parse(exams) : existingAcademic.exams,
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Academic updated successfully",
      academic: updatedAcademic,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};





