"use server"

import { DbConnect } from "@/lib/DbConnect";
import Memories from "@/models/memories.model";
import User from "@/models/user.model";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const SaveMemory = async({ title, date, image })=>{
    await DbConnect();
    const {userId} = await auth();
    const FoundUser = await User.findOne({clerkId:userId});
    if(!FoundUser){
        throw new Error("User not found");
    }
try {
    await Memories.create({
         createdBy: FoundUser._id,
            photo: image,
            title: title,
            memoryDate: date,
    })
    console.log("Memory Created Successfully");
    revalidatePath('/');
    
} catch (error) {
    console.log(error);
}
}

export const GetAllMemories = async()=>{
    await DbConnect();
    const {userId} = await auth();
    const FoundUser = await User.findOne({clerkId:userId});
    if(!FoundUser){
        throw new Error("User not found");
    }
    try {
        const FoundMemories = await Memories.find({createdBy:FoundUser._id});
        return FoundMemories;
    } catch (error) {
        console.log(error);
    }
}