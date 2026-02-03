"use client";

import { useState, useEffect } from "react";
import TopicCard from "./TopicCard";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Topic } from "@/types";

const TopicCardList = ({ data, handleTagClick }: {data: Topic[], handleTagClick: (tag: string) => void}) => {
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

const TagFeed = ({ tag, desc }: {tag: string, desc: string}) => {
  const [posts, setPosts] = useState<Topic[]>([]);
  const router = useRouter();

  const handleTagClick = (tag: string) => {
    router.push(`/tag?tag=${tag.replace("#", "")}`);
  };
  const handleReturnClick = () => {
    router.push("/");
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch("api/topic", {
        method: "POST",
        body: JSON.stringify({ tag: tag }),
        });
        
        if (!res.ok) {
          throw new Error('Failed to fetch topics')
        }
      const data = await res.json() as Topic[];
      setPosts(data);
      } catch (error) {
        console.error("Error fetching topics:", error)
      }
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
