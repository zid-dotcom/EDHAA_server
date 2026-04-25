const  mongoose=require('mongoose')

mongoose.connect(process.env.DATABASE).then(()=>{
    console.log('server connected to mongoDB DATABASE');
    

}).catch(()=>{
    console.log('connection failed');
    
})

