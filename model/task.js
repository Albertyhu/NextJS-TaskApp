import mongoose from 'mongoose';
const Schema = mongoose.Schema; 

const Task = new Schema({
    name: { type: String, required: true }, 
    dateCreated: { type: Date, required: true },
    finished: {type: Boolean, required: true, default: false}, 
})

export default mongoose?.models?.Task || mongoose?.model?.("Task", Task)