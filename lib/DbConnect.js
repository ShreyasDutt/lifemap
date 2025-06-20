import mongoose from "mongoose";

const DB_URI = process.env.DB_URI;

export const DbConnect = async() =>{

    if (!DB_URI) return console.log("Database URI string is Missing");

    const readyState = mongoose.connection.readyState;
    if (readyState===1) {
        return console.log("DB Already Connected")
    }
    try {
       await mongoose.connect(DB_URI);
       console.log("DB Connected")
    } catch (error) {
        console.error("DB connection error:", error);
    }

}