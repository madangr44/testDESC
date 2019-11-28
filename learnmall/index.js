var express = require('express');
var mongooose = require('mongoose');
var bodyParser = require('body-parser');
var route = require('./router');

var app= express();

app.use(bodyParser.json());

mongooose.connect('mongodb://localhost/learnmall?poolsize=100',{ useNewUrlParser: true,useUnifiedTopology: true }),(err)=>{
    if(err){
        console.log("mongoDB connection failed");

    }
    else{
        console.log("mongoDB connected succesfully")
    }

};

var PORT=3333;
app.listen(PORT,()=>console.log(`app started running on server ${PORT}`));

//middle ware
app.use('/user',route);



 




