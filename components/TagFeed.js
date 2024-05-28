"use client";

import { useState, useEffect } from "react";
import TopicCard from "./TopicCard";
import { useRouter } from "next/navigation";
import Image from "next/image";

const TopicCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 topic_layout'>
      {data.map((topic) => (
        <TopicCard
          key={topic._id}
          post={topic}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const TagFeed = ({ tag, desc }) => {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  const handleTagClick = (tag) => {
    router.push(`/tag?tag=${tag.replace("#", "")}`);
  };
  const handleReturnClick = () => {
    router.push("/");
  };

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch("api/topic", {
        method: "POST",
        body: JSON.stringify({ tag: tag }),
      });
      const data = await res.json();
      setPosts(data);
    };
    fetchPost();
  }, [tag]);

  return (
    <section className='w-full'>
      <h1 className='flex text-left head_text divide-x divide-sky-400'>
        <Image
          src='/assets/icons/arrow-go-back.svg'
          alt='Go Back'
          width={60}
          height={60}
          className='object-contain rounded-full pr-3 cursor-pointer'
          onClick={handleReturnClick}
        />
        <span className='blue_gradient pl-3 break-all'>#{tag}</span>
      </h1>
      <p className='desc text-left'>{desc}</p>
      <div>
        <TopicCardList data={posts} handleTagClick={handleTagClick} />
      </div>
    </section>
  );
};

export default TagFeed;
