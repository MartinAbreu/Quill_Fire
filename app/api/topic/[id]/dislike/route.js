import Topic from "@/models/topic";
import { connectToDB } from "@/utils/database";

export const PUT = async (req, { params }) => {
  console.log(req.body);
  const { userId, action } = await req.json();
  let updateDislikes;
  try {
    await connectToDB();

    if (action === "undislike") {
      updateDislikes = await Topic.updateOne(
        { _id: params.id },
        { $pull: { dislikes: userId } },
      );
    }

    if (action === "dislike") {
      updateDislikes = await Topic.updateOne(
        { _id: params.id },
        { $addToSet: { dislikes: userId } },
      );
    }

    if (updateDislikes.modifiedCount !== 1) {
      return res.status(500).json({ message: "Failed to dislike topic" });
    }
    const updatedTopic = await Topic.findOne({ _id: params.id });
    return new Response(JSON.stringify(updatedTopic), { status: 200 });
  } catch (error) {
    return new Response("Failed to update topic", { status: 500 });
  }
};
