"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { usePathname } from "next/navigation";
import ProfileImage from "./ProfileImage";

const Nav = () => {
  const { data: session } = useSession();
  const path = usePathname();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.svg'
          alt='QuillFire logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>
          Quill<span className='orange_gradient'>Fire</span>
        </p>
      </Link>

      {path === "/login" ? (
        <></>
      ) : (
        <>
          {/* Desktop Navigation */}
          <div className='sm:flex hidden'>
            {session?.user ? (
              <div className='flex gap-3 md:gap-5'>
                <Link href={"/create-topic"} className='black_btn'>
                  Create Post
                </Link>

                <button type='button' className='outline_btn' onClick={signOut}>
                  Sign Out
                </button>

                <Link href='/profile'>
                  <ProfileImage user={session?.user} onClick={() => {}} />
                </Link>
              </div>
            ) : (
              <div className='flex gap-3 md:gap-5'>
                <Link href={"/login"} className='black_btn'>
                  Sign In
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className='sm:hidden flex relative'>
            {session?.user ? (
              <div className='flex'>
                <ProfileImage
                  user={session?.user}
                  onClick={() => setToggleDropdown((prev) => !prev)}
                />

                {toggleDropdown && (
                  <div className='dropdown'>
                    <Link
                      href='/profile'
                      className='dropdown_link'
                      onClick={() => setToggleDropdown(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      href='/create-topic'
                      className='dropdown_link'
                      onClick={() => setToggleDropdown(false)}
                    >
                      Create Topic
                    </Link>
                    <button
                      type='button'
                      onClick={() => {
                        setToggleDropdown(false);
                        signOut();
                      }}
                      className='mt-5 w-full black_btn'
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href={"/login"} className='black_btn'>
                  Sign In
                </Link>
              </>
            )}
          </div>
        </>
      )}
    </nav>
  );
};

export default Nav;
