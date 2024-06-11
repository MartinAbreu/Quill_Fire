"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";
import FormValidations from "@utils/validations";

const CreateTopic = () => {
  const router = useRouter();
  const { data: session } = useSession();

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
  }, [session?.user, router]);

  const createTopic = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const createdOn = new Date().toISOString();

    if (!isValid) {
      setErrors(error);
      return;
    }

    try {
      const response = await fetch("/api/topic/new", {
        method: "POST",
        body: JSON.stringify({
          title: post.title,
          topic: post.topic,
          htmltopic: post.htmltopic,
          userId: session?.user.id,
          tag: post.tag,
          theme: post.theme,
          createdOn,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createTopic}
      errors={errors}
    />
  );
};

export default CreateTopic;
