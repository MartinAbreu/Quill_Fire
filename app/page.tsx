import Feed from "@/components/Feed";

const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        Discover &
        <br className='max-md:hidden' />
        <span className='orange_gradient text-center'> Ignite Your Ideas</span>
      </h1>
      <p className='desc text-center'>
        Explore a World of Stories & Ideas: Share Yours Too
      </p>

      <Feed />
    </section>
  );
};

export default Home;
