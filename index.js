const express=require("express");
const app =express();
const methodOverride = require("method-override");

 const port = 8080;
const path =require("path");

const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static (path.join(__dirname,"public")));
let posts=[
    {
        id:uuidv4(),
        username:"Apna college",
        content:" I LEarn Conding From Apna college",
},
{
    id:uuidv4(),
    username:"Adarsh",
    content:" Every One Jaap Hare krishna Hare Krishna ",
},
{
    id:uuidv4(),
    username:"Rahulkumar",
    content:" I Got First Intenship in Amazon :)",
}
]
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})
app.post("/posts",(req,res)=>{
    let id = uuidv4();
    let {username,content}=req.body;
    posts.push({ id,username,content})
    // res.send("post request Working !!")

    res.redirect("/posts")
});

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    console.log(id)
    let post =posts.find((p)=>id===p.id);
    res.render("show.ejs",{post})
    // res.send("Request Working")
   
    
});
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newcontent=req.body.content;
    let post =posts.find((p)=>id===p.id);
    post.content=newcontent;
    console.log(post);
    res.redirect("/posts");
    
    console.log(id);
    res.send("Patch request is working")
})
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post =posts.find((p)=>id===p.id);
    res.render("edit.ejs")
})
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
     posts=posts.filter((p)=>id!==p.id);
    // console.log(id)
    res.send("DELETE Sucessfully")
    res.redirect("/posts");
})

app.listen(port,()=>{
    console.log(`Listining the ${port}`)
})