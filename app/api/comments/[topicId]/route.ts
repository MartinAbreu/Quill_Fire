import Comment from "@/models/comment";
import { connectToDB } from "@/utils/database";

export const GET = async (_req: Request, { params }: {params: {topicId: string}}) => {
  try {
    await connectToDB();
    const comments = await Comment.find({ topicId: params.topicId }).populate(
      "creator",
    );

    if (!comments) return new Response("Comments not found", { status: 401 });

    return new Response(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    return new Response("Failed to get comments", { status: 500 });
  }
};

export const POST = async (req: Request, { params }: { params: { topicId: string } }) => {
  const { content, creator, createdOn } = await req.json();
  const { topicId } = params;
  try {
    await connectToDB();
    const newComment = new Comment({
      creator,
      topicId,
      content,
      createdOn,
    });

    await newComment.save();

    return new Response(JSON.stringify(newComment), { status: 201 });
  } catch (error) {
    return new Response("Failed to get comments", { status: 500 });
  }
};
