const jwt=require('jsonwebtoken')

 
const jwtmiddleware=async(req,res,next)=>{
    try{
        const {atoken}=req.headers
        if(!atoken){
            res.status(500).json('token is not Authorised')
        }else{
            const tokenverify=jwt.verify(atoken,process.env.JWT_SECRET)
            console.log(tokenverify);
            next()
            


        }

 


    }
    catch(err){
        console.log(err);
        res.status(406).json(err)
        
    }
}


module.exports=jwtmiddleware
