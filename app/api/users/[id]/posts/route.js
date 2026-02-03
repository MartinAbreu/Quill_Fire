import Topic from "@/models/topic";
import { connectToDB } from "@/utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const topics = await Topic.find({ creator: params.id }).populate("creator");

    return new Response(JSON.stringify(topics), { status: 200 });
  } catch (error) {
    return new Response("Failed to get topics", { status: 500 });
  }
};
