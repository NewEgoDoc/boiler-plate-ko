const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
//const moment = require("moment");

const userSchema = mongoose.Schema({
    name: {
        type:String,
        maxlength:50
    },
    email: {
        type:String,
        trim:true,
        unique: 1 
    },
    password: {
        type: String,
        minglength: 5
    },
    lastname: {
        type:String,
        maxlength: 50
    },
    role : {
        type:Number,
        default: 0 
    },
    image: String,
    token : {
        type: String,
    },
    tokenExp :{
        type: Number
    }
})


userSchema.pre('save', function( next ) {
    var user = this;
    
    if(user.isModified('password')){//여러가지 상황중에 비밀번호를 바꿀때만 하위 내용 실행 
        // console.log('password changed')
        bcrypt.genSalt(saltRounds, function(err, salt){// saltRounds를 가지고 암호화 전처리 진행 
            if(err) return next(err);//에러가 발생하면 에러를 가지고 next
    
            bcrypt.hash(user.password, salt, function(err, hash){//user의 비밀번호를 가지고 본격적인 암호화 진행
                if(err) return next(err);//암호화 실패시
                user.password = hash //암호화가 정상적으로 작동하면 hash로 해당 값이 들어오게 되고
                next()//정상종료되면 다음으로 넘어감
            })
        })
    } else {//이메일이나 다른 값들이 변하면 상위내용 진행하지 않고
        next()//다음으로
    }
});

userSchema.methods.comparePassword = function(plainPassword,cb){
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if (err) return cb(err);
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb) {
    var user = this;
    console.log('user',user)
    console.log('userSchema', userSchema)
    var token =  jwt.sign(user._id.toHexString(),'secretToken')//해당 내용을 가지고 token을 만들게 된다
    //var oneHour = moment().add(1, 'hour').valueOf();
    
    //user.tokenExp = oneHour;
    user.token = token;
    user.save(function (err, user){
        if(err) return cb(err)
        cb(null, user);
    })
}


userSchema.statics.findByToken = function (token, cb) {
    var user = this;

    jwt.verify(token,'secretToken',function(err, decoded){
        user.findOne({
            //"_id":decoded, 
            "token":token
        }, function(err, user){
            if(err) return cb(err);
            cb(null, user);
        })
    })
}

const User = mongoose.model('User', userSchema);

module.exports = { User }