const express = require('express');
const app = express();
const port = 5000;

const { User } = require('./models/User');

const config = require('./config/key')

app.use(express.urlencoded({extended:true}))

app.use(express.json())

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI,{
    useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify:false
}).then(()=>console.log('MongoDB Connected...'))//.catch(err=>console.log(err))


app.get('/',(req,res)=>{
    res.send('Hellow World');
})

app.post('/register',(req,res)=>{


    const user = new User(req.body)

    user.save((err,userInfo)=>{
        if(err) return res.json({success: false, err})
        return res.status(200).json({
            success:true
        })
    })
})

app.post('/login',(req,res)=>{
    User.findOne({email:req.body.email},(err,userInfo)=>{
        if(!userInfo){ 
            return res.json({
                loginSuccess: false,
                message:'제공된 이메일에 해당하는 유저가 없습니다'
            })
        }

        user.comparePassword(req.body.password, (err,isMatch)=>{
            
        })
    })
})

app.listen(port,()=>console.log(`Example app listening on port ${port}`))