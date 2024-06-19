import Topic from "@models/topic";
import User from "@models/user";
import { connectToDB } from "@utils/database";

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // milliseconds

const getTopicsWithRetry = async (retries = MAX_RETRIES) => {
  try {
    await connectToDB();
    const topics = await Topic.find({}).populate("creator");
    return { topics, error: null };
  } catch (error) {
    if (retries > 0) {
      console.warn(`Retrying to fetch topics. Attempts left: ${retries}`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      return getTopicsWithRetry(retries - 1);
    }
    return { topics: null, error };
  }
};

export const GET = async (request) => {
  const { topics, error } = await getTopicsWithRetry();

  if (error) {
    console.error("Failed to get topics:", error);
    return new Response("Failed to get topics", { status: 500 });
  }

  return new Response(JSON.stringify(topics), { status: 200 });
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
