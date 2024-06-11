"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";
import FormValidations from "@utils/validations";

const Register = () => {
  const [submitting, setIsSubmitting] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const [providers, setProviders] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [favColor, setFavColor] = useState("");
  const [isValid, error] = FormValidations(
    { username, password, email },
    "signUp"
  );
  const [errors, setErrors] = useState({
    usernameField: false,
    usernameFieldError: "",
    passwordField: false,
    passwordFieldError: "",
    emailField: false,
    emailFieldError: "",
    signUpError: false,
    signUpErrorString: "",
  });

  useEffect(() => {
    if (session?.user) {
      return router.push("/");
    }
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, [session?.user, router]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrors({
      usernameField: false,
      usernameFieldError: "",
      passwordField: false,
      passwordFieldError: "",
      emailField: false,
      emailFieldError: "",
      signUpError: false,
      signUpErrorString: "",
    });
    setIsSubmitting(true);

    if (!isValid) {
      setErrors(error);
      setIsSubmitting(false);

      return;
    }

    const newUser = {
      username,
      email,
      password,
      favColor,
    };

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    const data = await response.json();
    if (data.userExists) {
      setErrors({
        signUpError: true,
        signUpErrorString: data.message,
      });
      setIsSubmitting(false);
      return;
    }
    if (data.success) {
      router.push("/");
    } else {
      setErrors({
        signUpError: true,
        signUpErrorString: "Error creating account, please try again later.",
      });
      setIsSubmitting(false);
      return;
    }
  };

  return (
    <section className='bg-gray-1 py-20 lg:py-[120px]'>
      <div className='container mx-auto'>
        <div className='-mx-4 flex flex-wrap'>
          <div className='w-full px-4'>
            <div className='relative mx-auto max-w-[450px] overflow-hidden rounded-lg bg-white px-10 py-16 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]'>
              <div className='mb-10 text-center md:mb-16'>
                <div className='flex gap-2 flex-center'>
                  <Image
                    src='/assets/images/logo.svg'
                    alt='QuillFire logo'
                    width={40}
                    height={40}
                    className='object-contain'
                  />
                  <p className='font-satoshi font-semibold text-xl text-black tracking-wide'>
                    Quill<span className='orange_gradient'>Fire</span>
                  </p>
                </div>
              </div>
              <form>
                <div className='mb-6'>
                  <input
                    type='text'
                    name='username'
                    className='cred_input'
                    value={username}
                    placeholder='username'
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <span className='text-red-600 italic text-xs float-left'>
                    {errors.usernameField && errors.usernameFieldError}
                  </span>
                  <input
                    type='email'
                    name='email'
                    value={email}
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                    className='cred_input mt-6'
                  />
                  <span className='text-red-600 italic text-xs float-left'>
                    {errors.emailField && errors.emailFieldError}
                  </span>
                  <input
                    type='password'
                    name='password'
                    value={password}
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                    className='cred_input mt-6'
                  />
                  <span className='text-red-600 italic text-xs float-left'>
                    {errors.passwordField && errors.passwordFieldError}
                  </span>
                  <div className='flex flex-col mt-6 border border-r-6 p-3'>
                    <span className='flex text-gray-500 font-satoshi mb-3'>
                      Favorite Color:
                    </span>
                    <div className='flex gap-5 mb-2'>
                      <button
                        className={`w-8 h-8 bg-red-600 rounded-full bg-cover hover_effect ${
                          favColor === "bg-red-600"
                            ? "-translate-y-1 scale-110 drop-shadow-lg border-2 border-orange-600"
                            : ""
                        }`}
                        type='button'
                        onClick={() => {
                          setFavColor("bg-red-600");
                        }}
                      ></button>
                      <button
                        className={`w-8 h-8 bg-blue-600 rounded-full bg-cover hover_effect ${
                          favColor === "bg-blue-600"
                            ? "-translate-y-1 scale-110 drop-shadow-lg border-2 border-orange-600"
                            : ""
                        }`}
                        type='button'
                        onClick={() => {
                          setFavColor("bg-blue-600");
                        }}
                      ></button>
                      <button
                        className={`w-8 h-8 bg-green-600 rounded-full bg-cover hover_effect ${
                          favColor === "bg-green-600"
                            ? "-translate-y-1 scale-110 drop-shadow-lg border-2 border-orange-600"
                            : ""
                        }`}
                        type='button'
                        onClick={() => {
                          setFavColor("bg-green-600");
                        }}
                      ></button>
                      <button
                        className={`w-8 h-8 bg-orange-500 rounded-full bg-cover hover_effect ${
                          favColor === "bg-orange-500"
                            ? "-translate-y-1 scale-110 drop-shadow-lg border-2 border-orange-600"
                            : ""
                        }`}
                        type='button'
                        onClick={() => {
                          setFavColor("bg-orange-500");
                        }}
                      ></button>
                      <button
                        className={`w-8 h-8 bg-purple-600 rounded-full bg-cover hover_effect ${
                          favColor === "bg-purple-600"
                            ? "-translate-y-1 scale-110 drop-shadow-lg border-2 border-orange-600"
                            : ""
                        }`}
                        type='button'
                        onClick={() => {
                          setFavColor("bg-purple-600");
                        }}
                      ></button>
                    </div>
                  </div>
                </div>
                <div className='mb-10'>
                  <button
                    type='submit'
                    disabled={submitting}
                    className='black_btn w-full'
                    onClick={handleSignUp}
                  >
                    Sign Up
                  </button>
                  <span className='text-red-600 italic text-xs'>
                    {errors.signUpError && errors.signUpErrorString}
                  </span>
                </div>
              </form>
              <div className='py-3 flex items-center text-sm text-black before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6'>
                Or
              </div>

              <p className='mb-6 text-base text-secondary-color dark:text-dark-7'>
                Connect With
              </p>
              <ul className='-mx-2 mb-12 flex justify-between'>
                <li className='w-full px-2'>
                  <a
                    className='flex h-11 items-center justify-center rounded-md bg-[#D64937] hover:bg-opacity-90'
                    onClick={() => signIn("google")}
                  >
                    <svg
                      width='18'
                      height='18'
                      viewBox='0 0 18 18'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M17.8477 8.17132H9.29628V10.643H15.4342C15.1065 14.0743 12.2461 15.5574 9.47506 15.5574C5.95916 15.5574 2.8306 12.8821 2.8306 9.01461C2.8306 5.29251 5.81018 2.47185 9.47506 2.47185C12.2759 2.47185 13.9742 4.24567 13.9742 4.24567L15.7024 2.47185C15.7024 2.47185 13.3783 0.000145544 9.35587 0.000145544C4.05223 -0.0289334 0 4.30383 0 8.98553C0 13.5218 3.81386 18 9.44526 18C14.4212 18 17.9967 14.7141 17.9967 9.79974C18.0264 8.78198 17.8477 8.17132 17.8477 8.17132Z'
                        fill='white'
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
