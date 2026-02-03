import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createdOnDateTime } from '@/utils/tools.js';
import ProfileImage from "./ProfileImage";
import { Comment } from '@/types'


const CommentItem = ({ comment } : { comment: Comment}) => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleProfileClick = () => {
    if (comment.creator._id === session?.user.id)
      return router.push("/profile");

    router.push(
      `/profile/${comment.creator._id}?name=${comment.creator.username}`
    );
  };

  return (
    <div className='flex items-start justify-start'>
      <ProfileImage user={comment.creator} onClick={handleProfileClick} />

      <div className='flex flex-col ml-1'>
        <div className='flex justify-start items-baseline'>
          <span
            className='font-semibold font-satoshi mr-3 text-sm cursor-pointer'
            onClick={handleProfileClick}
          >
            {comment.creator.username}
          </span>
          <span className='font-satoshi text-xs italic text-gray-600'>
            {createdOnDateTime(comment.createdOn)}
          </span>
        </div>
        <p className='flex font-satoshi text-sm'>{comment.content}</p>
      </div>
    </div>
  );
};
const Comments = ({ comments, topicId, onCommentAdded }: { comments: Comment[]; topicId: string; onCommentAdded: (comment: Comment) => void }) => {
  const { data: session } = useSession();
  const [newComment, setNewComment] = useState("");

  const handleAddComment = async () => {
    const createdOn = new Date().toISOString();
    const response = await fetch(`api/comments/${topicId}`, {
      method: "POST",
      body: JSON.stringify({
        creator: session?.user.id,
        topicId,
        content: newComment,
        createdOn,
      }),
    });

    const data: Comment = await response.json();

    if (response.ok) {
      onCommentAdded(data);
    }
    setNewComment("");
  };
  return (
    <div className='mt-6'>
      <h1 className='mb-3'>Comments</h1>
      <div className='w-full border border-gray-200'></div>
      {session?.user ? (
        <div className='flex justify-center items-center'>
          <ProfileImage user={session?.user} onClick={() => {}} />
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder='Add a comment...'
            required
            className='form_textarea resize-none'
          />
          <button onClick={handleAddComment}>
            <Image
              src={"/assets/icons/send-black.svg"}
              alt='Send Comment'
              width={40}
              height={40}
              className='object-contain my-3 mr-3'
            />
          </button>
        </div>
      ) : (
        <></>
      )}
      {comments.length ? (
        <div className='flex flex-col gap-3'>
          {comments.map((comment) => {
            return (
              <div key={comment._id}>
                <CommentItem comment={comment} />
                <div className='w-full border border-gray-200 my-2'></div>
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Comments;
