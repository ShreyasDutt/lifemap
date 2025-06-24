import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    profilepic: {
      type: String
    },
    firstname: {
      type: String,
      required: true
    },
    memories: [{
      type: mongoose.Types.ObjectId,
      ref: 'Memories'
    }]
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
