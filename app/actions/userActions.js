"use server"

import { DbConnect } from "@/lib/DbConnect";

export const SaveMemory = async({ title, description, date, image })=>{
    await DbConnect();
try {
    console.log(title, description, date, image);
    
} catch (error) {
    console.log(error);
}
}