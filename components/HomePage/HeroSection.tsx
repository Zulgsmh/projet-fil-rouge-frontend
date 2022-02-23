import Image from "next/image";
import React from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";

const HeroSection = () => {
  return (
    <div className="flex relative flex-col text-white w-full h-[91vh] items-center justify-center">
      <div className="flex flex-col">
        <h2 className="text-xl">MyEasyContainer</h2>
        <h1 className="text-6xl">Start working with our service !</h1>
        <p className="text-lg">
          We provide you{" "}
          <u className="underline decoration-pink-500 decoration-dotted decoration-2">
            container fully configurated
          </u>{" "}
          to work on your project without installing anything on your machine.
        </p>
      </div>
      <svg
        className="absolute text-gray-400  top-1/2 transform -translate-y-16  sm:translate-x-1/4 md:-translate-y-24 lg:-translate-y-72 z-0 -right-80"
        width={404}
        height={384}
        fill="none"
        viewBox="0 0 404 384"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
            x={0}
            y={0}
            width={20}
            height={20}
            patternUnits="userSpaceOnUse"
          >
            <rect
              x={0}
              y={0}
              width={4}
              height={4}
              className="text-warm-gray-200"
              fill="currentColor"
            />
          </pattern>
        </defs>
        <rect
          width={404}
          height={384}
          fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
        />
      </svg>
      <Image
        className=""
        src="/images/Saly-13.png"
        height={350}
        width={350}
        alt="Worker"
      />
      <ChevronDownIcon className="w-14 h-14 animate-bounce" />
    </div>
  );
};

export default HeroSection;
