import React from "react";

import { FaCentos, FaWindows, FaUbuntu } from "react-icons/fa";

interface IUserContainerInstance {
  id: string;
  name: string;
  available: boolean;
  baseImage: string;
  ram: string;
  storage: string;
  stack: string[];
  connect: (id: string) => void;
}

export const UserContainerInstance = ({
  id,
  name,
  available,
  baseImage,
  ram,
  stack,
  storage,
  connect,
}: IUserContainerInstance) => {
  return (
    <div className=" relative w-full h-24 flex items-center justify-between shadow-sm rounded-lg  px-5">
      <div className="flex items-center">
        {baseImage === "centOS" ? (
          <FaCentos className="w-7 h-7" />
        ) : baseImage === "ubuntu" ? (
          <FaUbuntu className="w-7 h-7" />
        ) : baseImage === "windows" ? (
          <FaWindows className="w-7 h-7" />
        ) : null}

        <div className=" ml-10 flex flex-col">
          <label className="text-lg">{name}</label>
          <label className="text-sm text-gray-300">
            {stack.map((i, idx) => {
              return <>{idx === stack.length - 1 ? i : i + ", "}</>;
            })}
          </label>
        </div>
      </div>

      {available ? (
        <>
          <span className=" absolute flex h-3 w-3 -top-1 -right-1">
            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <button onClick={() => connect(id)} className="btn-inline">
            Connect
          </button>
        </>
      ) : (
        <>
          <span className=" absolute flex h-3 w-3 -top-1 -right-1">
            <span className="animate-ping absolute inline-flex h-3 w-3  rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <label>Cannot access</label>
        </>
      )}
    </div>
  );
};
