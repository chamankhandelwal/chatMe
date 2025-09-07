import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import methodOverride from "method-override";
import {Chat} from "./models/chat.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const app = express();
const port = 3000;

app.set("views",path.join(__dirname,"views"));
app.set("views engine","ejs");
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.listen(port,()=>{
    console.log("Server is lisiting at",port);
})
app.get("/",(req,res)=>{
    res.send("Get request.");
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/chatme");
}
main()
.then((res)=>{
    console.log("connection success.");
})
.catch((err)=>{
    console.log(err);
})

app.get("/chats",async(req,res)=>{
    let chats = await Chat.find();
    console.log(chats);
    res.render("index.ejs",{chats});
})

app.get("/chats/new",(req,res)=>{
    res.render("newchat.ejs");
})

app.post("/chats",(req,res)=>{
    // let {from,msg,to}=req.body;
    let newchat=new Chat({...req.body,createdAt:Date.now()});
    newchat.save()
    .then((res)=>{
        console.log(res);
    })
    .catch((err)=>{
        console.log(err);
    })
    res.redirect("/chats");
})

app.get("/chats/:id/edit",async(req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
})

// update route
app.put("/chats/:id",async(req,res)=>{
    let {id} = req.params;
    let {newMsg,newTo}=req.body;
    let newChat = await Chat.findByIdAndUpdate(id,{msg:newMsg,to:newTo},{runValidators:true,new:true});
    res.redirect("/chats");
})

app.delete("/chats/:id/delete",async(req,res)=>{
    let {id}=req.params;
    let chat = await Chat.findByIdAndDelete(id,{new:true});
    res.redirect("/chats");
})