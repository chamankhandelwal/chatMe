import mongoose from "mongoose";

const chatSch = mongoose.Schema({
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    msg:{
        type:String,
        required:true

    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now()
    }
});

const Chat = mongoose.model("Chat",chatSch);
export {Chat};