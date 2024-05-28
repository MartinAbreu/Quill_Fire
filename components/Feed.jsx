"use client";

import { useState, useEffect } from "react";
import TopicCard from "./TopicCard";
import { useRouter } from "next/navigation";

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

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  const filterTopics = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.topic)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResults = filterTopics(e.target.value);
        setSearchResults(searchResults);
      }, 500)
    );
  };

  const handleTagClick = (tag) => {
    router.push(`/tag?tag=${tag.replace("#", "")}`);
  };

  const fetchPost = async () => {
    const res = await fetch("api/topic");
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for topic or username...'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {searchText ? (
        <TopicCardList data={searchResults} handleTagClick={handleTagClick} />
      ) : (
        <TopicCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
