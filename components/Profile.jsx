import TopicCard from "./TopicCard";

const Profile = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
  handleTagClick,
}) => {
  return (
    <section className='w-full'>
      <h1 className='text-left head_text'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>{desc}</p>
      <div className='mt-8 topic_layout'>
        {data.map((topic) => (
          <TopicCard
            key={topic._id}
            post={topic}
            handleEdit={() => handleEdit && handleEdit(topic)}
            handleDelete={() => handleDelete && handleDelete(topic)}
            handleTagClick={handleTagClick}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
