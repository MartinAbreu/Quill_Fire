"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import TagFeed from "@/components/TagFeed";

const TagFeedPage = () => {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");
  return (
    <Suspense fallback={<p>loading...</p>}>
      <TagFeed
        tag={tag}
        desc={`Discover a Collection of Posts based on #${tag}`}
      />
    </Suspense>
  );
};

export default TagFeedPage;
