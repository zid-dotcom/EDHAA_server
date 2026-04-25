const mongoose=require('mongoose')


const newsSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }


})

const newsModel=mongoose.model('newsModel',newsSchema)
module.exports=newsModel