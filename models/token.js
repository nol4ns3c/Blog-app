const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const tokenSchema  = new Schema({
    userid:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'user',
        unique:true,

    },

    token:{
        type:String, 
        required:true,
    },
    CreatedAt:{
        type:Date,
        default:Date.now(),
        expires: 3600,

    }
})


const Token = mongoose.model('Token', tokenSchema);
  
module.exports = Token;
  