import Comment from "@/models/comment";
import { connectToDB } from "@/utils/database";

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await Comment.findByIdAndDelete(params.commentId);

    return new Response("Comment deleted successfully", { status: 200 });
  } catch (err) {
    return new Response("Failed to delete comment", { status: 500 });
  }
};
