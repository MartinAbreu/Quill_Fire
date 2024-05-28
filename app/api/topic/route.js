import Topic from "@models/topic";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();
    const topics = await Topic.find({}).populate("creator");

    return new Response(JSON.stringify(topics), { status: 200 });
  } catch (error) {
    return new Response("Failed to get topics", { status: 500 });
  }
};

export const POST = async (req) => {
  const { tag } = await req.json();
  try {
    await connectToDB();

    let query = {};
    if (tag) {
      query = { tag: { $regex: tag, $options: "i" } };
    } else {
      query = {};
    }
    const topics = await Topic.find(query).populate("creator");

    return new Response(JSON.stringify(topics), { status: 200 });
  } catch (err) {
    return new Response("Failed to get topics", { status: 500 });
  }
};
