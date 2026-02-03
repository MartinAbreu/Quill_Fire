"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@/components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`api/users/${session.user.id}/posts`);
      const data = await res.json();
      setPosts(data);
    };

    if (session?.user.id) {
      fetchPost();
    }
  }, [session?.user.id]);

  const handleTagClick = (tag) => {
    router.push(`/tag?tag=${tag.replace("#", "")}`);
  };

  const handleEdit = (post) => {
    router.push(`/update-topic?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete your topic?");

    if (hasConfirmed) {
      try {
        await fetch(`api/topic/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (err) {}
    }
  };

  return (
    <Profile
      name='My'
      desc='Welcome to your personalized profile page'
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      handleTagClick={handleTagClick}
    />
  );
};

export default MyProfile;
