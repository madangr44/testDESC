var express = require('express');
var router= express.Router();
var MongoSchema = require('./models/user');
var jwt= require('jsonwebtoken');

//using postman
//adding data to db   localhost:3333/user/login
router.post('/login',(req,res)=>{
    MongoSchema.create(req.body).then(function(err,data){
        
    res.send({
        err:err,
        data:data,
        token:token
    });


     });
     
 });

 
 

 
//get user data  localhost:3333/user/details

router.get('/details',(req,res)=>{
    MongoSchema.find().then(function(data,err,token){
        console.log(data)
        res.json(data)
        res.json(token)
     })
})



//jwt assign
//
router.get('/jwt/create',(req,res)=>{
    var token=jwt.sign({username:req.body.username},'keysecret',(err,token)=>{
        if(err){
            console.log("error found");
        }
        else{
            res.json({token:token});
        }
    });
 })


 //jwt authentication
// eg: postman key:auth value :bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hbm9qIiwiaWF0IjoxNTc0OTMzOTUyfQ.m2eAZFdMcXENNw4gj1gdwy78oM3tvLcZHzYwXivS8U0
router.post('/jwt/posts',verifyTToken,(req,res)=>{
    jwt.verify(req.token,'keysecret',(err,authData)=>{
        if(err){
            res.status(403).send('error found');
            //res.json({message:'post created.',authData});
        }
        else{
            res.json({message:'post created.',authData});
        }

    })
    
})


function verifyTToken(req,res,next){
    var bearerHeader = req.headers['auth'];

    if(typeof bearerHeader!=undefined){
        var bearer= bearerHeader.split(' ');
        var bearToken = bearer[1];
        req.token = bearToken;
        next();
    }else{
        res.status(403).send('not found')
    }
}


module.exports=router;