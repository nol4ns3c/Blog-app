const mongoose = require('mongoose');
const {Schema, model} = mongoose;
const validator = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    email: {type: String, required: true, min: 4,unique: true  },
    username: {type: String, required: true, min: 4,unique: true  },
    password: {type:String, required: true},
    verified: {type:Boolean, default:false}

    
});



//const UserModel = model('User', UserSchema);

UserSchema.statics.signup = async function (email, username, password) {
    if (!validator.isEmail(email)) {
      throw new Error('Email is not valid');
    }

    const existsemail = await this.findOne({email})

    if(existsemail){
        throw new Error('Email in use')
    }
    
    const existsuser = await this.findOne({username})

    if(existsuser){
        throw new Error('Username in use')
    }
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);
  
    const user = await this.create({ email, username, password: hash });
  
    return user;
  };
  
  const User = mongoose.model('User', UserSchema);
  
  module.exports = User;
  