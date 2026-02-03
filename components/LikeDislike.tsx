"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

const LikeDislike = ({ topicId, iconSize } : {topicId: string, iconSize: number}) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [isLiked, setIsliked] = useState(false);
  const [isDisliked, setIsdisliked] = useState(false);
  const [_isLikeLoading, setIsLikeLoading] = useState(false);
  const [_isDislikeLoading, setIsDislikeLoading] = useState(false);
  const [likesUpdated, setLikesUpdated] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    setLikesUpdated(false);
    const getLikesDislikes = async () => {
      const response = await fetch(`/api/topic/${topicId}`);
      const topic = await response.json();
      setLikes(topic.likes.length);
      setDislikes(topic.dislikes.length);
      setIsLikeLoading(false);
      setIsDislikeLoading(false);

      topic.likes.map((like: string) => {
        if (like === session?.user.id) {
          setIsliked(true);
        }
      });

      topic.dislikes.map((dislike: string) => {
        if (dislike === session?.user.id) {
          setIsdisliked(true);
        }
      });
    };

    if (topicId) getLikesDislikes();
  }, [topicId, likesUpdated, session?.user.id]);

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLikeLoading(true);

    if (isLiked) {
      try {
        const response = await fetch(`api/topic/${topicId}/like`, {
          method: "PUT",
          body: JSON.stringify({
            userId: session?.user.id,
            action: "unlike",
          }),
        });

        if (response.ok) {
          setIsliked(false);
          setLikesUpdated(true);
        }
      } catch (err) {
        console.error("Error unliking topic:", err);
      } finally {
        setIsLikeLoading(false);
      }
      return;
    } else if (isDisliked) {
      try {
        const likeResponse = await fetch(`api/topic/${topicId}/like`, {
          method: "PUT",
          body: JSON.stringify({
            userId: session?.user.id,
            action: "like",
          }),
        });

        const dislikeResponse = await fetch(`api/topic/${topicId}/dislike`, {
          method: "PUT",
          body: JSON.stringify({
            userId: session?.user.id,
            action: "undislike",
          }),
        });

        if (likeResponse.ok && dislikeResponse.ok) {
          setIsdisliked(false);
          setLikesUpdated(true);
        }
      } catch (err) {
        console.error("Error liking topic:", err);
      } finally {
        setIsLikeLoading(false);
      }
      return;
    } else {
      try {
        const response = await fetch(`api/topic/${topicId}/like`, {
          method: "PUT",
          body: JSON.stringify({
            userId: session?.user.id,
            action: "like",
          }),
        });

        if (response.ok) setLikesUpdated(true);
      } catch (err) {
        console.error("Error liking topic:", err);
      } finally {
        setIsLikeLoading(false);
      }
    }
  };
  const handleDislike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDislikeLoading(true);

    if (isDisliked) {
      try {
        const dislikeResponse = await fetch(`api/topic/${topicId}/dislike`, {
          method: "PUT",
          body: JSON.stringify({
            userId: session?.user.id,
            action: "undislike",
          }),
        });

        if (dislikeResponse.ok) {
          setIsdisliked(false);
          setLikesUpdated(true);
        }
      } catch (err) {
        console.error("Error disliking topic:", err);
      } finally {
        setIsDislikeLoading(false);
      }
    } else if (isLiked) {
      try {
        const likeResponse = await fetch(`api/topic/${topicId}/like`, {
          method: "PUT",
          body: JSON.stringify({
            userId: session?.user.id,
            action: "unlike",
          }),
        });

        const dislikeResponse = await fetch(`api/topic/${topicId}/dislike`, {
          method: "PUT",
          body: JSON.stringify({
            userId: session?.user.id,
            action: "dislike",
          }),
        });

        if (likeResponse.ok && dislikeResponse.ok) {
          setIsliked(false);
          setLikesUpdated(true);
        }
      } catch (err) {
        console.error("Error disliking topic:", err);
      } finally {
        setIsDislikeLoading(false);
      }
    } else {
      try {
        const response = await fetch(`api/topic/${topicId}/dislike`, {
          method: "PUT",
          body: JSON.stringify({
            userId: session?.user.id,
            action: "dislike",
          }),
        });
        if (response.ok) setLikesUpdated(true);
      } catch (err) {
        console.error("Error disliking topic:", err);
      } finally {
        setIsDislikeLoading(false);
      }
    }
  };
  return (
    <div className='bg-slate-50/[.40] border-gray-600 border-solid rounded-md p-1'>
      <div className='flex items-baseline gap-3'>
        <div className='flex cursor-pointer'>
          {isLiked ? (
            <Image
              src='/assets/icons/likeIcons/green-thumb-filled.png'
              alt='Liked'
              width={iconSize || 20}
              height={iconSize || 20}
              className='object-contain'
              onClick={handleLike}
            />
          ) : (
            <Image
              src='/assets/icons/likeIcons/green-thumb.png'
              alt='Like'
              width={iconSize || 20}
              height={iconSize || 20}
              className='object-contain'
              onClick={handleLike}
            />
          )}

          <span className='text-sm text-gray-600 font-satoshi font-thin'>
            {likes}
          </span>
        </div>

        <div className='flex cursor-pointer'>
          {isDisliked ? (
            <Image
              src='/assets/icons/likeIcons/red-thumb-filled.png'
              alt='Disliked'
              width={iconSize || 20}
              height={iconSize || 20}
              className='object-contain'
              onClick={handleDislike}
            />
          ) : (
            <Image
              src='/assets/icons/likeIcons/red-thumb.png'
              alt='Dislike'
              width={iconSize || 20}
              height={iconSize || 20}
              className='object-contain'
              onClick={handleDislike}
            />
          )}
          <span className='text-sm text-gray-600 font-satoshi font-thin'>
            {dislikes}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LikeDislike;
