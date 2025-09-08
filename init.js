import mongoose from "mongoose";
import {Chat} from "./models/chat.js";

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/fakewp");
}
main()
.then((res)=>{
    console.log("Connection success")
})
.catch((err)=>{
    console.log(err);
})

let allChat = [
  {
    from: "Chaman",
    to: "Jatin",
    msg: "Bhai wo notes bhej de.",
  },
  {
    from: "Jatin",
    to: "Chaman",
    msg: "Haan bhai, kal tak de dunga.",
  },
  {
    from: "Jatin",
    to: "Rohit",
    msg: "Kal movie dekhne chalein?",
  },
  {
    from: "Rohit",
    to: "Jatin",
    msg: "Haan bro, mai free hoon.",
  }];
Chat.insertMany(allChat);