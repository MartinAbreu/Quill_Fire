import Topic from "@models/topic";
import Comment from "@models/comment";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const topic = await Topic.findById(params.id).populate("creator");

    if (!topic) return new Response("Topic not found", { status: 401 });

    return new Response(JSON.stringify(topic), { status: 200 });
  } catch (error) {
    return new Response("Failed to get topic", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { title, topic, htmltopic, tag, theme, createdOn } =
    await request.json();

  try {
    await connectToDB();

    const existingTopic = await Topic.findById(params.id);

    if (!existingTopic) return new Response("Topic not found", { status: 401 });

    existingTopic.title = title;
    existingTopic.topic = topic;
    existingTopic.htmltopic = htmltopic;
    existingTopic.tag = tag;
    existingTopic.theme = theme;
    existingTopic.createdOn = createdOn;

    await existingTopic.save();

    return new Response(JSON.stringify(existingTopic), { status: 200 });
  } catch (err) {
    return new Response("Failed to update topic", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await Comment.deleteMany({ topicId: params.id });

    await Topic.findByIdAndDelete(params.id);

    return new Response("Topic and comments deleted successfully", {
      status: 200,
    });
  } catch (err) {
    return new Response("Failed to delete topic ad comments", { status: 500 });
  }
};
