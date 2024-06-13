const express = require("express")
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
app.set("view engine" , "ejs");
//Create the varibale array to store the all post array because we donn't have database
let posts = [
    {
        id:uuidv4(),
        username : 'jagdish',
        content : 'I am very lazy about my work'
    },
    {
        id : uuidv4(),
        username : 'Harwani',
        content : 'This is my sirname'
    },
    {
        id : uuidv4(),
        username : 'JagdishHarwani',
        content : 'This is my fullname'
    }
]
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.listen(8080,()=>{console.log("App is listening");});
app.get("/posts",(req,res)=>{
    res.render("home.ejs",{posts})
})
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})
app.post("/posts",(req,res)=>{
    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts")
})
app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let new_content = req.body.content;
    let new_username = req.body.username;
    let post = posts.find((p)=>id===p.id);
    post.content = new_content;
    post.username = new_username;
    res.redirect("/posts")
})
app.get(("/posts/:id/edit"),(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
})
app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id===p.id)
    res.render("show.ejs",{post});
})
app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=>id!==p.id)
    res.redirect("/posts")
})