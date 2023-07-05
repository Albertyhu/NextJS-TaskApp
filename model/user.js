import mongoose from 'mongoose'; 
import Task from './task'; 
const Schema = mongoose.Schema; 

const User = new Schema({
    username: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String}, 
    joinedDate: { type: Date }, 
    tasks: [{type: Schema.Types.ObjectId, ref: Task}]
})

export default mongoose?.models?.User || mongoose?.model?.("User", User)