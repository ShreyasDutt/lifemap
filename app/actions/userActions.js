"use server"

import { DbConnect } from "@/lib/DbConnect";

export const SaveMemory = async(formData)=>{
    await DbConnect();
try {
    console.log(formData.get('photo'))
} catch (error) {
    console.log(error);
}
}