const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require("./route");
const env = require("dotenv");
const postRoute = require("./post");

app.use(express.json())
app.use("/user",router)
app.use("/authorisedUser",postRoute)
env.config();

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_connection) //(err, data) => {
  // if (err) throw err
  // console.log("connection created");
  .then(()=>{
    console.log("connection created")
  })
  .catch((err)=> {
    console.log("something went wrong ${err}")
  })

// })
app.listen(4000);






















  // app.get('/', function (req, res){
//     res.send('Hello World')
//   })

//post
// app.post('/', (req,res)=>{
//     res.send("This is post method")
// })
