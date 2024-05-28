import { Schema, model, models } from "mongoose";

const CommentSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  topicId: {
    type: Schema.Types.ObjectId,
    required: [true, "topicId is required!"],
  },
  content: {
    type: String,
    required: [true, "content is required!"],
  },
  createdOn: {
    type: Date,
    required: [true, "createdOn is required."],
  },
});

const Comment = models.Comment || model("Comment", CommentSchema);

export default Comment;
