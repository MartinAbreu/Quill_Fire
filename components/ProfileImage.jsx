import Image from "next/image";

const ProfileImage = ({ user, onClick }) => {
  const initials = user.username.match(/(\b\w{2})/g).join("");
  return (
    <div>
      {user.image ? (
        <Image
          src={user.image}
          alt='Profile'
          width={40}
          height={40}
          className='rounded-full'
          onClick={onClick}
        />
      ) : (
        <div onClick={onClick}>
          <div
            className={`w-10 h-10 flex justify-center ${
              user.favColor ? user.favColor : "bg-primary-orange"
            } items-center rounded-full bg-cover`}
          >
            <span className='capitalize font-satoshi text-white font-semibold opacity-50 '>
              {initials}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileImage;
