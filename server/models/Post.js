const mongoose  = require('mongoose') ; 

const PostSchema = mongoose.Schema({
    owner : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : 'user'
    } , 
    image : {
        publicId : String , 
        url : String 
    }, 
    caption : {
        type : String , 
        required:true , 
    },
    likes : [
        {
            type: mongoose.Schema.Types.ObjectId , 
            ref : 'user' 
        }
    ]
},{
    timeStamps:true 
}) ;

module.exports = mongoose.model ('post' , PostSchema) ; 