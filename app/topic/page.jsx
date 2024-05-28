"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.bubble.css";
import { createdOnDateTime } from "@utils/tools";
import LikeDislike from "@components/LikeDislike";
import Comments from "@components/Comments";
import ProfileImage from "@components/ProfileImage";

const Topic = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const topicId = params.get("topicId");
  const [topic, setTopic] = useState({});
  const [comments, setComments] = useState({});
  const [userInfo, setUserInfo] = useState({});

  const handleAddedComment = (newComment) => {
    const updatedComment = {
      ...newComment,
      creator: { username: session?.user.username, image: session?.user.image },
    };
    setComments([updatedComment, ...comments]);
  };

  useEffect(() => {
    const getTopicDetails = async () => {
      const response = await fetch(`api/topic/${topicId}`);
      const data = await response.json();
      setTopic({
        title: data.title,
        topic: data.topic,
        htmltopic: data.htmltopic,
        tag: data.tag,
        theme: data.theme,
        createdOn: data.createdOn,
        creator: data.creator,
        topicId: data._id,
      });

      setUserInfo({
        username: data.creator.username,
        image: data.creator.image,
        email: data.creator.email,
        favColor: data.creator.favColor,
      });
    };

    const getTopicComments = async () => {
      const response = await fetch(`api/comments/${topicId}`);
      const data = await response.json();

      setComments(
        data.sort((a, b) => {
          return new Date(b.createdOn) - new Date(a.createdOn); // descending
        })
      );
    };

    if (topicId) getTopicDetails(), getTopicComments();
  }, [topicId]);

  const handleProfileClick = () => {
    if (topic.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${topic.creator._id}?name=${userInfo.username}`);
  };

  return (
    <section className='w-full'>
      {topic?.topic && (
        <div className='grid max-w-7xl xs:grid-cols-1 md:grid-cols-4 mx-auto bg-white rounded-md'>
          <div
            className='flex flex-col items-center'
            style={{
              backgroundImage: `url('/assets/images/backgrounds/${
                topic.theme || "bg5"
              }.svg')`,
            }}
          >
            <div
              className='flex flex-col justify-center items-center gap-3 cursor-pointer mt-8'
              onClick={handleProfileClick}
            >
              <span className='font-satoshi font-semibold text-gray-700'>
                Author
              </span>
              <ProfileImage user={userInfo} onClick={handleProfileClick} />

              <div className='text-center'>
                <h3 className='font-satoshi font-semibold text-gray-900'>
                  {userInfo.username}
                </h3>
                <p className='font-inter text-xs text-gray-500'>
                  {userInfo.email}
                </p>
              </div>
            </div>
          </div>
          <div className='col-span-3 m-8'>
            <div className='flex justify-between'>
              <h1 className='text-6xl text-center font-medium font-satoshi text-gray-700 mb-8 text-wrap'>
                {topic.title}
              </h1>
              <LikeDislike topicId={topicId} iconSize={30} />
            </div>

            <ReactQuill
              theme='bubble'
              value={topic.htmltopic}
              className='bg-white rounded-md text-gray-700'
              readOnly={true}
            />
            <span className=' flex justify-end col-span-2 text-gray-400 text-xs'>
              {createdOnDateTime(topic.createdOn)}
            </span>
            <Comments
              comments={comments}
              topicId={topic.topicId}
              onCommentAdded={handleAddedComment}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Topic;
