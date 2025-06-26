"use server"

import { DbConnect } from "@/lib/DbConnect";
import Memories from "@/models/memories.model";
import User from "@/models/user.model";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
import Group from "@/models/group.model";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})


export const SaveMemory = async({ title, date, image,imageId })=>{
    await DbConnect();
    const {userId} = await auth();
try {
    const FoundUser = await User.findOne({clerkId:userId});
    if(!FoundUser){
         return new Error("User not found");
    }
   const CreatedMemory = await Memories.create({
         createdBy: FoundUser._id,
            photo: image,
            title: title,
            memoryDate: date,
            imageId:imageId
    })
    FoundUser.memories.push(CreatedMemory._id);
    await FoundUser.save();
    console.log("Memory Created Successfully");
    revalidatePath('/');
    
} catch (error) {
    console.log(error);
}
}

export const GetAllMemories = async () => {
  await DbConnect();
  const { userId } = await auth();
  try {
    const FoundUser = await User.findOne({ clerkId: userId }).populate("memories");
    if (!FoundUser) throw new Error("User not found");

    const grouped = {};

    FoundUser.memories.forEach((memoryDoc) => {
      const memory = memoryDoc.toObject();
      const date = new Date(memory.memoryDate).toISOString().split("T")[0]; // 'YYYY-MM-DD'
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(memory);
    });

    const groupedArray = Object.keys(grouped).map((date) => ({
      date,
      memories: grouped[date],
    }));

    return groupedArray;
  } catch (error) {
    console.log(error);
  }
};


export const DeleteMemory = async(id)=>{
    await DbConnect();
    try {
    const memory = await Memories.findById(id);
    if(!memory){
        throw new Error("Memory not found");
    }
    await cloudinary.uploader.destroy(memory.imageId);  
    await Memories.findByIdAndDelete(id);
    revalidatePath('/');
    return {success:true,message:"Memory Deleted Successfully"};
    } catch (error) {
        console.log(error);
    }
}

export const GetUserGroups = async() =>{
  await DbConnect();
  const {userId} = await auth();
  const FoundUser = await User.findOne({clerkId:userId})
  try {
    const Groups = await Group.find({groupMembers:FoundUser._id});
    return Groups;
  } catch (error) {
    console.log(error);
  }
}