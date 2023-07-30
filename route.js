// to create api
//here we create api to register
const express = require('express').Router(); //router defines the flow 
const route = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const userModule = require('./module');
const {registerValidation, loginvalidation} = require("./validation");

//Register user                                    //creating api to show data

route.post('/register',async(req,res)=>{
    const {error} = registerValidation(req.body);

    if(error) return res.status(404).send(error.details[0].message);
    

    //password
    const salt = await bcrypt.genSalt(10)
    const hashpasswd = await bcrypt.hash(req.body.password, salt);              //to check user id or email is existing or not or same 
                                                                         
    const emailExist = await userModule.findOne({email : req.body.email});
    if(emailExist) return res.status(404).send("email is already exists")

    //encryption: to encrypt password or for protecting passwor
    //encryption convert password into unary or hypertext
    
    //description is opposite of encryption                                                                    


    const newUser = new userModule({
        name:req.body.name,
        email:req.body.email,
        mobile:req.body.mobile,
       // password:req.body.password
       password : hashpasswd
    })

    try{
        const saveData = await newUser.save();
        res.send(saveData)
    } catch(error){
        console.log(error);
    }
})
//showdata

route.get("/showData",async(req,res)=>{
    try{
       const showData = await userModule.find();
       res.send(showData);

    } catch(error){
       console.log(error);
    }
})

// delete user

route.delete("/delete",async(req,res)=>{
    let id = req.query.id;
    try{
      const deleteData = await  userModule.findByIdAndDelete(id);
      res.send("Deleted Successfully")
    } catch(error){
        console.log(error);
    }
})

//update user
route.post("/update",async(req,res)=>{
    let _id = req.query._id;
    try{
      const updateData = await  userModule.findByIdAndUpdate(_id,req.body);
      res.send(updateData)
    } catch(error){                   
        console.log(error);
    }
})

//show one user data
route.get("/showone",async(req,res)=>{      //this is called CRUD method
    const id = req.query.id
    try{
       const showone = await userModule.findById(id);
       res.send(showone);

    } catch(error){
       console.log(error);
    }
})

//login validation api
route.post("/login",async(req,res)=>{
    const {error} = loginvalidation(req.body)
    if(error) return res.status(404).send(error.details[0].message)

    //email validation
    const userExist = await userModule.findOne({email:req.body.email})
    if(!userExist) return res.status(404).send("Invalid email")

    //login password validation
    const ispass = await bcrypt.compare(req.body.password,userExist.password)
    if(!ispass) return res.status(404).send("Invalid password")
    
    const token = jwt.sign({_id : userExist._id},process.env.Token_secret)

    res.header('auth-token',token),send(token)
    

    res.send("Login successful")

})

module.exports = route;




