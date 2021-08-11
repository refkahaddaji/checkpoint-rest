const mongoose = require('mongoose');
const express = require('express');
var bodyParser=require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const port=5000;
require('dotenv').config({path:'./config/.env'});

var User=require('./models/User');

//mongoose.connect(process.env.URI,{ useNewUrlParser: true,useUnifiedTopology: true ,useFindAndModify:false},(err)=>{
  mongoose.connect(process.env.DB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
   } ,(err)=>{ 

if(err) throw err;
console.log("DB Connected Successfully");
})
console.log(process.env.URI);

app.get('/users',(req,res)=>{
    User.find().exec((err,users)=>{
        if(err) res.status(400).send(err);
        else res.status(200).json(users);
    })
})

app.post('/adduser',(req,res)=>{
    console.log("adding new user")
    var userObj={
        "first_name": req.body.first_name,
        "last_name" :req.body.last_name,
        "age": req.body.age
    } 
    var newUser=new User(userObj);
    newUser.save((err,user)=>{
        if(err) res.status(400).send("there is an error while adding new user");
        else res.status(200).json(user);
    })

})
app.put('/updateuser/:id',(req,res)=>{
    console.log("updating user")
    User.findByIdAndUpdate(req.params.id,req.body,{new:true}).exec((err,user)=>{
        if(err) res.status(400).send("there is an error while updating user");
        else res.status(200).json(user);
    })
    
})

app.delete('/deleteuser/:id',(req,res)=>{
    console.log("deleting user")
    User.findByIdAndDelete(req.params.id).exec((err,user)=>{
        if(err) res.status(400).send("there is an error while deleting user");
        else res.status(200).json(user);
    })
    
})

app.get('/', (req,res)=>{
    res.send("home page!");
})

app.listen(port,()=> {
    console.log("app is running in port:",port)
})