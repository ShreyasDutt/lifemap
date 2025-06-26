import mongoose, { Schema } from "mongoose";

const GroupSchema = new Schema({
    groupName:{
        type:String,
        required: true
    },
    groupMembers:[{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required:true
    }],
    groupAdmins:[{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required:true,
    }],
    Memories:[{
        type: mongoose.Types.ObjectId,
        ref:"Memories",
    }]
},{timestamps:true})

const Group = mongoose.models.Group || mongoose.model('Group',GroupSchema);
export default Group;