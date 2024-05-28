"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import TopicCard from "@components/TopicCard";

const UserProfile = ({ params }) => {
  const param = useSearchParams();
  const username = param.get("name");

  const router = useRouter();
  const [posts, setPosts] = useState([]);

  const handleReturnClick = () => {
    router.push("/");
  };

  const handleTagClick = (tag) => {
    router.push(`/tag?tag=${tag.replace("#", "")}`);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${params.id}/posts`);
      const data = await res.json();
      setPosts(data);
    };

    if (params?.id) fetchPosts();
  }, [params.id]);
  return (
    <section className='w-full'>
      <h1 className='flex text-left head_text break-all'>
        <Image
          src='/assets/icons/arrow-go-back.svg'
          alt='Go Back'
          width={60}
          height={60}
          className='object-contain pr-3 cursor-pointer'
          onClick={handleReturnClick}
        />
        <span className='blue_gradient'>{`${username}'s Profile`}</span>
      </h1>
      <p className='desc text-left'>{`Check out what ${username} been writing about!`}</p>
      <div className='mt-8 topic_layout'>
        {posts.map((post) => (
          <TopicCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
            handleTagClick={handleTagClick}
          />
        ))}
      </div>
    </section>
  );
};

export default UserProfile;
