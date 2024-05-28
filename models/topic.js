import { Schema, model, models } from "mongoose";

const TopicSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: [true, "Title is required."],
  },
  topic: {
    type: String,
    required: [true, "Topic is required."],
  },
  htmltopic: {
    type: String,
    required: [true, "Topic is required."],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  },
  theme: {
    type: String,
  },
  createdOn: {
    type: Date,
    required: [true, "createdOn is required."],
  },
  likes: {
    type: Array,
  },
  dislikes: {
    type: Array,
  },
});

const Topic = models.Topic || model("Topic", TopicSchema);

export default Topic;
