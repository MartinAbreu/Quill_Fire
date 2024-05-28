"use client";
import { useSearchParams } from "next/navigation";
import TagFeed from "@components/TagFeed";

const TagFeedPage = () => {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");
  return (
    <TagFeed
      tag={tag}
      desc={`Discover a Collection of Posts based on #${tag}`}
    />
  );
};

export default TagFeedPage;
