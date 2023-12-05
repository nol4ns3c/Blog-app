const express = require("express")
const app = express()
const path =require("path");
const User = require('./models/user');
const Post = require('./models/Post')
const cors = require('cors');
const { default: mongoose } = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');   
const cookieParser = require('cookie-parser');
const multer = require('multer');
const fs = require('fs');
const sendMail = require("./Utils/sendMail")
const Token = require('./models/token')
const crypto = require('crypto');
const token = require("./models/token");
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'/views'));

app.use(cors({credentials:true,origin:'http://localhost:3000'},))
app.use(express.json())
app.use(cookieParser())
app.use('/Uploads',express.static(__dirname + '/Uploads'));

const uploadMiddle = multer({dest : 'Uploads/'})
const secret = 'dshkjahfkljsaf'
const randomDelayMiddleware = (req, res, next) => {
    const randomDelay = Math.floor(Math.random() * 500); // Random delay in milliseconds (adjust as needed)

    setTimeout(() => {
        next();
    }, randomDelay);
};

// Apply the middleware to relevant routes
app.use(randomDelayMiddleware);

mongoose.connect('mongodb+srv://thenol4n:bIGzM0VaSKhkyjXN@mydb.js1allo.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp')

app.listen(4000, () => {
    console.log("I AM LISTENING");
})

app.use(express.static(path.join(__dirname,'/public')))




app.post('/signup', async (req,res) => {
    const {email, username, password} = req.body;  
    try {
        const user = await User.signup(email,username,password)
        const token = await new Token({
            userid: user._id,
            token:crypto.randomBytes(32).toString('hex'),
        }).save()
    const url = `http://localhost:4000/users/${user._id}/verify/${token.token}`
    await sendMail(user.email, "Verify email", url)

        res.status(200).send({message : 'Mai sent'})
    } catch (Error) {
        res.status(400).json({error: Error.message})
        
    }


})

app.post('/login',randomDelayMiddleware, async(req,res) => {
    const {email, password} = req.body;
    const userExist = await User.findOne({email})

     if(userExist){

    const UserDoc = await User.findOne({email})
     const passOk = bcrypt.compareSync(password,UserDoc.password)
    console.log(UserDoc.verified)
    if(passOk){
        if(UserDoc.verified){
        
        
        const username = UserDoc.username
        jwt.sign({username,id:UserDoc._id},secret, {}, (err, token) => {
            if(err) throw err;
            res.cookie('token', token).json({
                username,}  
            );
        })} else{

            let token =await Token.findOne({userid:UserDoc._id})
            
            if(!token){
                token = await new Token({
                    userid: UserDoc._id,
                    token:crypto.randomBytes(32).toString('hex'),
                }).save()
                console.log('test')
            }

            const url = `http://localhost:4000/users/${UserDoc._id}/verify/${token.token}`
            await sendMail(UserDoc.email, "Verify email", url)

            res.status(400).json({error: 'User not verified mail sent again'})
        }


    } else{
        res.status(400).json({error: 'Email or Password is incorrect'})

    }


    } else{
        res.status(400).json({error: 'Email or Password is incorrect'})


    }
})
   
    
app.get('/profile', (req,res) =>{
   const {token} = req.cookies;  
   
    jwt.verify(token, secret, {}, (err,info) =>{
        if(err) throw res.json(err)
        res.json(info)
    })
})  

app.post('/logout', (req,res) =>{
    res.cookie('token', ' ').json('ok');
})

app.post('/post',uploadMiddle.single('file'), async (req,res) =>{
    
    let newPath = null;
    if (req.file) {
      const {originalname,path} = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      newPath = path+'.'+ext;
      fs.renameSync(path, newPath);
    }

    const {title,summary,content} =req.body;
    const {token} = req.cookies;  

    jwt.verify(token, secret, {}, async(err,info) =>{
        if(err) throw res.json(err)
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover: newPath,
            author: info.id,
    
        })
    
        res.json(postDoc)
    })

    


}
)


app.get('/posts', async (req, res) =>{

    const posts = await Post.find()
    .populate('author', ['username'])
    .sort({createdAt: -1})
    
    res.json(posts)    

})

app.get('/post/:id', async (req,res) =>{
    const {id} = req.params
    const PostDoc = await Post.findById(id).populate('author',['username'])
    res.json(PostDoc)
})





app.put('/post',uploadMiddle.single('file'), async (req,res) => {
    let newPath = null;
    if (req.file) {
      const {originalname,path} = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      newPath = path+'.'+ext;
      fs.renameSync(path, newPath);
    }
  
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err,info) => {
      if (err) throw err;
      const {id,title,summary,content} = req.body;
      const postDoc = await Post.findById(id);
      const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
      if (!isAuthor) {
        return res.status(400).json('you are not the author');
      }
      postDoc.title = title;
      postDoc.summary = summary;
      postDoc.content = content;
      postDoc.cover = newPath ? newPath : postDoc.cover;
      
      await postDoc.save();
      
  
      res.json(postDoc);
    });
  
  });

  app.delete('/post/:id', async (req,res) => {
    const {id} = req.params

    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err,info) => {
        if (err) throw err;
    try {
        // Find the post by ID and delete it
        const deletedPost = await Post.findByIdAndRemove(id);
    
        // Check if the post exists
        if (!deletedPost) {
          return res.status(404).json({ message: 'Post not found' });
        }
    
        res.json({ message: 'Post deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting post' });
      }
  })});

  app.get('/users/:id/verify/:token', async(req,res) =>{
    try {
        const user =await User.findOne({_id:req.params.id});
        if(!user){
            return res.status(400).send({message:"Invalid link"})

        }

        const token =await Token.findOne({
            userid:user._id,
            token:req.params.token,

    })

    console.log(token)

        if(!token){
        return res.status(400).send({message:"Invalid link with token"})

    }

    await User.updateOne({_id:user._id}, {verified:true})
    await Token.findOneAndRemove({userid:user._id});
    res.status(200).send({message:'Email verified succesfully'})
        
    } catch (error) {
        console.log(error)
    }
  })
 

  app.post('/resetpass',randomDelayMiddleware, async(req,res) => {

    const {password,passwordagain} = req.body
    const {token} = req.cookies;
    

    console.log(password)
    console.log(passwordagain)
    if (password === passwordagain){
        jwt.verify(token, secret, {}, async (err,info) => {
            if (err) throw err;
        try {
            console.log(info)
            // Check if the post exists
            
        
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error deleting post' });
          }
      }
        
    } else{
        res.json('password arent same') 
    }


  })