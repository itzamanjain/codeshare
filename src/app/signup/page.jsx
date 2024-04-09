"use client";
import { useRef, useState, useEffect } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";


const Page = () => {
  // const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const router = useRouter();


 
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const registerUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = await fetch(`/api/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      }),
    });
    router.push("/login");
    setIsLoading(false);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-[100vh] flex justify-center bg-black items-center ">
      <div className="bg-[#f4f4f4]  p-8 rounded shadow-md 2xs:w-[90%] xs:w-[90%] md:w-3/4 sm:w-2/3 2xl:w-[28%] lg:w-2/6  h-auto mt-10  bg-gradient-to-r from-[#141414] to-[#1c1c1c] text-[#ffffff]">
        <h2 className="text-3xl max-md:text-2xl  font-semibold mb-7">
          Welcome to Code Share
        </h2>

        <div className="my-4">
          <label className="block mb-1" htmlFor="email">
            Username
          </label>
          <input
            className="w-full border rounded px-3 py-2 outline-none border-none focus:outline-none focus:border-[#1c1c1c] bg-[#1c1c1c] bg-gradient-to-r to-[#141414] from-[#1c1c1c]"
            type="text"
            id="username"
            ref={username}
            
            placeholder="Create Unique username"
          />
        </div>

        <div className="my-4">
          <label className="block mb-1" htmlFor="password">
            Email
          </label>
          <input
            className="w-full border rounded px-3 py-2 outline-none border-none focus:outline-none focus:border-[#1c1c1c] bg-[#1c1c1c] bg-gradient-to-r to-[#141414] from-[#1c1c1c]"
            type="email"
            id="email"
            ref={email}
            placeholder="Enter your  email"
          />
        </div>
        <div className="my-6  ">
          <label className="block mb-1" htmlFor="password">
            Create Password
          </label>
          <div className=" relative flex items-center">
            <input
              className="w-full border rounded px-3 py-2 outline-none border-none focus:outline-none focus:border-[#1c1c1c] bg-[#1c1c1c] bg-gradient-to-r to-[#141414] from-[#1c1c1c] pr-10 "
              type={showPassword ? "text" : "password"}
              id="password"
              ref={password}
              placeholder="Remember your password"
            />
            {showPassword ? (
              <FaRegEyeSlash
                onClick={handleShowPassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              />
            ) : (
              <FaRegEye
                onClick={handleShowPassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              />
            )}
          </div>
        </div>
        <button
          onClick={registerUser}
          className="w-full mt-4 mb-4 bg-[#1c1c1c] text-white rounded py-2 px-4 hover:bg-[#161616] transition duration-300"
        >
          {isLoading ? "Processing ... " : "Sign up"}
        </button>

        <a className="mt-4  hover:text-blue-900 hover:underline" href="/login">
          <span className="mt-4">Already on Code Share! Login.</span>
        </a>
        <div className="errormessage w-full flex justify-center mt-4 text-red-800">
          {errorMessage}
        </div>
      </div>
    </div>
  );
};

export default Page;
