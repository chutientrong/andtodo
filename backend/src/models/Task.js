import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    order: {
      type: Number,
    },
    stage: {
      type: String,
    },
    index: {
      type: Number,
    },
    // attachment: [
    //     { type: String, url: String }
    // ],
    todo: {
      type: Schema.Types.ObjectId,
      ref: "Todo",
    },
    
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default  Task;