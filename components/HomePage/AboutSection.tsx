import React from "react";
import { CloudIcon } from "@heroicons/react/solid";

import {
  FaAws,
  FaDocker,
  FaJava,
  FaPython,
  FaLinux,
  FaWindows,
} from "react-icons/fa";
import { GrConnect } from "react-icons/gr";
import { SiAnsible } from "react-icons/si";
import { FiSettings } from "react-icons/fi";
import Link from "next/link";

const AboutSection = () => {
  return (
    <div className="min-h-screen w-full flex flex-col relative">
      <div className="mb-10 gap-9 flex flex-col md:flex-row flex-wrap z-10">
        <div className="flex flex-col items-center text-center flex-1">
          <div className="bg-emerald-600 h-20 w-20 text-emerald-200 rounded-full p-2 mb-10">
            <CloudIcon className="h-16 w-16" />
          </div>
          <h3 className="text-emerald-600 text-lg">Cloud based</h3>
          <h2 className="text-white text-4xl">
            An API for your machine on the cloud.
          </h2>
          <p className="max-w-2xl text-gray-400 mb-5 text-lg">
            Use our API, you can can generate any container you want to realize
            your project on our cloud and we provide you an access to it.
          </p>
        </div>
        <div className="flex flex-col items-center text-center flex-1">
          <div className="flex items-center justify-center  bg-sky-600 f h-20 w-20 text-sky-200 rounded-full p-2 mb-10">
            <GrConnect className="h-10 w-10" />
          </div>
          <h3 className="text-sky-600 text-lg">API connexion</h3>
          <h2 className="text-white text-4xl">
            An API for your machine on the cloud.
          </h2>
          <p className="max-w-2xl text-gray-400 mb-5 text-lg">
            Use our API, you can can generate any container you want to realize
            your project on our cloud and we provide you an access to it.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center text-center flex-1 mb-20 z-10">
        <div className="bg-rose-600 h-20 w-20 text-rose-200 rounded-full p-2 mb-10">
          <FiSettings className="h-16 w-16" />
        </div>
        <h3 className="text-rose-600 text-lg">Any stack</h3>
        <h2 className="text-white text-4xl">
          We configure the container with what you want.
        </h2>
        <p className="max-w-2xl text-gray-400 mb-5 text-lg">
          Use our API, you can can generate any container you want to realize
          your project on our cloud and we provide you an access to it.
        </p>
      </div>

      <div className="text-gray-400 mb-20">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
              <SiAnsible className="icon-tech" />
            </div>
            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
              <FaWindows className="icon-tech" />
            </div>
            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
              <FaLinux className="icon-tech" />
            </div>
            <div className="col-span-1 flex justify-center md:col-span-3 lg:col-span-1">
              <FaJava className="icon-tech" />
            </div>
            <div className="col-span-2 flex justify-center md:col-span-3 lg:col-span-1">
              <FaPython className="icon-tech" />
            </div>
          </div>
        </div>
      </div>
      <Link href="/login">
        <button className="btn-inline w-1/3 self-center mb-5">
          Get started
        </button>
      </Link>
    </div>
  );
};

export default AboutSection;
