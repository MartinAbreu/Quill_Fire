import Topic from "@models/topic";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const { userId, title, topic, htmltopic, tag, theme, createdOn } =
    await request.json();

  try {
    await connectToDB();
    const newTopic = new Topic({
      creator: userId,
      title,
      topic,
      htmltopic,
      tag,
      theme,
      createdOn,
      likes: [],
      dislikes: [],
    });

    await newTopic.save();
    return new Response(JSON.stringify(newTopic), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new topic", { status: 500 });
  }
};
