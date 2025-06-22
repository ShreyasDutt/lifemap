import mongoose, { Schema } from "mongoose";

const MemorySchema = new Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
    memoryDate: {
      type: Date,
      required: true,
    },
    imageId:{
      type:String,
      required:true,
    }
  },
  { timestamps: true }
);

const Memories = mongoose.models.Memories || mongoose.model("Memories", MemorySchema);
export default Memories;
