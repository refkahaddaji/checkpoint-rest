let mongoose= require ('mongoose')

module.exports=mongoose.model('User',mongoose.Schema({

    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    }
}))