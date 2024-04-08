import React from "react";


export function GridBackgroundDemo() {
  
  return (
    <div className="h-[100vh] w-full flex-col dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
        Making Code Sharing <br /> <span className="ml-20">Easier For You</span>
      </p>
      <a className=" mt-4 mb-4 bg-[#1c1c1c] text-white rounded py-2 px-4 hover:bg-[#161616] transition duration-300"
        href="/signup"
      >
        Sign Up Now!
      </a>
    </div>
  );
}
