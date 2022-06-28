import React from "react";
import {
  deleteContainer,
  startContainer,
  stopContainer,
} from "../../api/containers/containerAPI";
import { FaCentos, FaWindows, FaUbuntu } from "react-icons/fa";
import { ModalDeleteContainer } from "./ModalDeleteContainer";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { containerDetailsState, userState } from "../../store/store";
import { useMutation, useQueryClient } from "react-query";
interface IUserContainerInstance {
  id: string;
  name: string;
  available: boolean;
  baseImage: string;
  stack: string[];
  dockerContainerId: string;
  connect: (id: string) => void;
}

export const UserContainerInstance = ({
  id,
  name,
  available,
  baseImage,
  stack,
  dockerContainerId,
  connect,
}: IUserContainerInstance) => {
  const userId = useRecoilValue(userState)!.id;
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const setContainerDetails = useSetRecoilState(containerDetailsState);

  const { mutate: removeContainer } = useMutation(
    async () => {
      return await deleteContainer(userId, id, dockerContainerId);
    },
    {
      onSuccess: () => {
        //close modal
        setOpen(false);
        //refetch containers data
        queryClient.invalidateQueries(["containers"]);
      },
    },
  );

  const openDetails = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setContainerDetails((prev) => {
      if (prev.idContainer === id && prev.isOpen) {
        return {
          idContainer: undefined,
          isOpen: false,
        };
      } else {
        return {
          idContainer: id,
          isOpen: true,
        };
      }
    });
  };

  const handleStartContainer = () => {
    startContainer(userId, dockerContainerId);
  };

  const handleStopContainer = () => {
    stopContainer(userId, dockerContainerId);
  };

  return (
    <>
      <ModalDeleteContainer
        open={open}
        setOpen={() => (open ? setOpen(false) : setOpen(true))}
        action={removeContainer}
      />
      <div className=" relative w-full h-24 flex items-center justify-center shadow-sm rounded-lg  px-5">
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
                return (
                  <label key={idx}>
                    {idx === stack.length - 1 ? i : i + ", "}
                  </label>
                );
              })}
            </label>
          </div>
        </div>

        <div className="w-full flex justify-end">
          <span className=" absolute flex h-3 w-3 -top-1 -right-1">
            <span
              className={`animate-ping absolute inline-flex h-3 w-3 rounded-full ${
                available ? "bg-emerald-400" : "bg-red-400"
              } opacity-75`}
            ></span>
            <span
              className={`relative inline-flex rounded-full h-3 w-3 ${
                available ? "bg-emerald-500" : "bg-red-500"
              }`}
            ></span>
          </span>
          {available ? (
            <div className="flex gap-3">
              <button onClick={() => connect(id)} className="btn-inline">
                Connect
              </button>
              <button
                onClick={handleStopContainer}
                className="btn-inline bg-rose-600"
              >
                Stop
              </button>
            </div>
          ) : (
            <button
              onClick={handleStartContainer}
              className="btn-inline bg-blue-500"
            >
              Start
            </button>
          )}

          <button className="btn-outline" onClick={openDetails}>
            Details
          </button>
          <button className="btn-danger" onClick={() => setOpen(true)}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
};
