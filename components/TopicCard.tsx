"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { createdOnDateTime } from "@/utils/tools";
import LikeDislike from "./LikeDislike";
import ProfileImage from "./ProfileImage";
import { Topic } from "@/types";

const TopicCard = ({ post, handleTagClick, handleEdit, handleDelete }:
  {
    post: Topic, handleTagClick: (tag: string) => void,
    handleEdit?: React.MouseEventHandler<HTMLParagraphElement>,
    handleDelete?: React.MouseEventHandler<HTMLParagraphElement>
  }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [tags, setTags] = useState<string[]>([]);

  const handleCardBg = () => {
    return `url('/assets/images/backgrounds/${post.theme || "bg5"}.svg')`;
  };

  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const handleTopicClick = () => {
    if (!post._id) return;

    router.push(`/topic?topicId=${post._id}`);
  };

  useEffect(() => {
    const textToArray = (text: string) => {
      const commaSeparated = text.split(",");
      const result = commaSeparated.map((item) => {
        return item.split(" ").map((part) => part.trim());
      });
      return result.flat();
    };

    const newArray = textToArray(post.tag);
    setTags(newArray);
  }, [post.tag]);
  return (
    <div
      style={{ backgroundImage: handleCardBg() }}
      className='topic_card drop-shadow-md'
    >
      <div className='cursor-pointer' onClick={handleTopicClick}>
        <div className='flex justify-between items-baseline'>
          <h1 className='font-satoshi text-gray-700 font-bold'>{post.title}</h1>
          <LikeDislike topicId={post._id} iconSize={20} />
        </div>

        <p className='my-4 font-satoshi text-sm text-gray-700' >
          {`${post.topic.substring(0, 45)}...`}
        </p>
        <span className='text-xs font-satoshi italic text-gray-400'>
          {createdOnDateTime(post.createdOn)}
        </span>
      </div>

      <div className='flex'>
        {tags.map((tag, idx) => {
          return (
            <p
              className='font-inter text-xs blue_gradient cursor-pointer mr-3'
              key={idx}
              onClick={() => handleTagClick && handleTagClick(tag)}
            >
              {tag}
            </p>
          );
        })}
      </div>
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-xs green_gradient cursor-pointer'
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className='font-inter text-xs orange_gradient cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}

      <div className='flex justify-between gap-5 items-start mt-4'>
        <div
          className='flex-1 flex justify-start items-center gap-5 cursor-pointer'
          onClick={handleProfileClick}
        >
          <ProfileImage user={post.creator} onClick={handleProfileClick} />

          <div>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {post.creator.username}
            </h3>
            <p className='font-inter text-xs text-gray-500'>
              {post.creator.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicCard;
