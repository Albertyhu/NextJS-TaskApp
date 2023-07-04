import mongoose from 'mongoose'; 
import Task from './task'; 
const Schema = mongoose.Schema; 

const User = new mongoose.Schema({
    username: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String}, 
    joinedDate: { type: Date }, 
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }], 
    profile_pic: { data: Buffer, contentType: String },
    biography: { type: String },
    SocialMediaLinks: [{
        platform: { type: String },
        link: { type: String }
    }],
    coverPhoto: { data: Buffer, contentType: String },
    images: [{ type: Schema.Types.ObjectId, ref: "UserPhoto" }], 
    communitiesFollowed: [{ type: Schema.Types.ObjectId, ref: "Categories" }],

    //Other users that the current user is connected to. This is similar to the friend feature on Facebook.
    connection: [{ type: Schema.Types.ObjectId, ref: "UserPhoto" }],
    connectionRequests: [{ type: Schema.Types.ObjectId, ref: "ConnectionReqest" }],
    //pendintRequestReceived: [{ type: Schema.Types.ObjectId, ref: "ConnectionReqest" }],
    //notification will be in the form of messages
    notifications: [{
        message: { type: String },
        sender: { type: Schema.Types.ObjectId, ref: "User" }, 
        action: { type: String }, 
        dateCreated: {type: Date}, 
    }], 
    message: [{
        message: { type: String },
        sender: { type: Schema.Types.ObjectId, ref: "User" },
        dateCreated: {type: Date}
    }],
    tasks: [{type: Schema.Types.ObjectId, ref: Task}]
})

export default mongoose?.models?.User || mongoose?.model?.("User", User)