//jshint esversion:6

const express = require("express");
const ejs = require("ejs");
const router=express.Router();
const mongoose=require("mongoose");

require('dotenv').config();

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
mongoose.set('strictQuery', true);
const app = express();
const lodash=require("lodash");
app.set('view engine', 'ejs');

app.use(express.static("public"));


mongoose.connect(process.env.ATLAS_URL);
mongoose.connection;

const Schema =mongoose.Schema;

const DataSchema = new Schema({
  title:String,
  data: String
});

const Posts=new mongoose.model("post",DataSchema);

//home page
app.get("/",function(req,res){
  Posts.find({}, function(err, dataitems){

     res.render("home", {

       homeStartingContent2: homeStartingContent,

       posts: dataitems
       });

   });

});
app.get("/posts/:postId",(req,res)=>{
  let urlTitle=req.params.postId;
  const titleLow=lodash.lowerCase(urlTitle);

Posts.findOne({_id:urlTitle},function(err,items){
  const postTitle= items.title;
  const contentPosts=items.data;
  res.render("post",{postTitle2:postTitle,contentPosts2:contentPosts});
  });

});

//rendering about page
app.get("/about",function(req,res){
  res.render("about",{aboutContent2:aboutContent});
});

//rendering contact page
app.get("/contact",(req,res)=>{
  res.render("contact",{contactContent2:contactContent});
});

//rendering compose page
app.get("/compose",(req,res)=>{
  res.render("compose");
});


//getting title and content from compose page and saving them
app.post("/compose",function(req,res){

  const dataItem=new Posts({
    title: req.body.contentTitle,
    data:req.body.content
  })
  dataItem.save(function(err){
    if(!err){
        res.redirect("/");
    }
  });

});
