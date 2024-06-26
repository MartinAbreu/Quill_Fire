"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

import Form from "@components/Form";
import FormValidations from "@utils/validations";

const EditTopic = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const topicId = searchParams.get("id");

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({
    title: "",
    topic: "",
    htmltopic: "",
    tag: "",
    theme: "",
  });

  const [isValid, error] = FormValidations(post, "topic");

  const [errors, setErrors] = useState({
    titleContent: false,
    titleError: "",
    topicContent: false,
    topicError: "",
    tagContent: false,
    tagError: "",
    themeSelected: false,
    themeError: "",
  });

  useEffect(() => {
    if (!session?.user) {
      return router.push("/");
    }
    const getTopicDetails = async () => {
      if (!topicId) return;
      const response = await fetch(`api/topic/${topicId}`);
      const data = await response.json();

      setPost(data);
    };

    getTopicDetails();
  }, [topicId, session?.user, router]);

  const editTopic = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!topicId) return alert("Topic ID not found");

    if (!isValid) {
      setErrors(error);
      setIsSubmitting(false);

      return;
    }

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
      errors={errors}
    />
  );
};

export default EditTopic;
