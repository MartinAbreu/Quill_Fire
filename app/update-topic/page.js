"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const EditTopic = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const topicId = searchParams.get("id");

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({
    title: "",
    topic: "",
    htmltopic: "",
    tag: "",
    theme: "",
  });

  useEffect(() => {
    const getTopicDetails = async () => {
      if (!topicId) return;
      const response = await fetch(`api/topic/${topicId}`);
      const data = await response.json();

      setPost(data);
    };

    getTopicDetails();
  }, [topicId]);

  const editTopic = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!topicId) return alert("Topic ID not found");

    const createdOn = new Date().toISOString();

    try {
      const response = await fetch(`/api/topic/${topicId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: post.title,
          topic: post.topic,
          htmltopic: post.htmltopic,
          tag: post.tag,
          theme: post.theme,
          createdOn,
        }),
      });

      if (response.ok) {
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={editTopic}
    />
  );
};

export default EditTopic;
