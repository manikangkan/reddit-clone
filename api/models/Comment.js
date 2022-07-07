import mongoose from "mongoose";

const Comment = mongoose.model(
  "Comment",
  new mongoose.Schema(
    {
      author: {
        type: String,
        required: true,
      },
      title: {
        type: String,
      },
      body: {
        type: String,
        required: true,
      },
      parentId: mongoose.ObjectId,
      rootId: mongoose.ObjectId,
    },
    {
      timestamps: true,
    }
  )
);

export default Comment;
