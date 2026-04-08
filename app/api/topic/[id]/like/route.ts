import Topic from "@/models/topic";
import { connectToDB } from "@/utils/database";

export const PUT = async (req: Request, { params } : { params: { id: string}}) => {
  const { userId, action } = await req.json();
  let updateLikes;
  try {
    await connectToDB();

    if (action === "unlike") {
      updateLikes = await Topic.updateOne(
        { _id: params.id },
        { $pull: { likes: userId } },
      );
    }
    if (action === "like") {
      updateLikes = await Topic.updateOne(
        { _id: params.id },
        { $addToSet: { likes: userId } },
      );
    }

    if (updateLikes?.modifiedCount !== 1) {
          return new Response(JSON.stringify({message: "Failed to like topic"}), { status: 500 });
    }
    const updatedTopic = await Topic.findOne({ _id: params.id });
    return new Response(JSON.stringify(updatedTopic), { status: 200 });
  } catch (error) {
    return new Response("Failed to update topic", { status: 500 });
  }
};
