import { Dialog, Transition } from "@headlessui/react";
import React from "react";
import { Fragment } from "react";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { useMutation, useQueryClient } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import { createContainer } from "../../api/containers/containerAPI";
import {
  messagesCreateContainerState,
  stackSelectedState,
  userState,
} from "../../store/store";
import { ALL_STACK } from "../../utils/stack";
import { RowMessage } from "./RowMessage";

interface IModalCreateContainer {
  setOpen: () => void;
  open: boolean;
}

export const ModalCreateContainer = ({
  setOpen,
  open,
}: IModalCreateContainer) => {
  const queryClient = useQueryClient();
  const refLastMessage = React.useRef(null);

  const [messages, setMessages] = useRecoilState(messagesCreateContainerState);
  const user = useRecoilValue(userState);

  const [stackSelected, setStackSelected] = useRecoilState(stackSelectedState);

  //create container
  const { mutate: createNewContainer } = useMutation(
    async () => {
      return await createContainer({
        name: "newContainer.name",
        servicesInstalled: stackSelected,
        userId: user!.id,
      });
    },
    {
      onSuccess: () => {
        //close modal
        setOpen();
        //refetch containers data
        queryClient.invalidateQueries(["containers"]);
      },
    },
  );

  const removeItemAtIndex = (arr: string[], index: number) => {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
  };

  /**
   * @description change every time message state is updated
   */
  React.useEffect(() => {
    if (messages.length === 0)
      setMessages([
        ...messages,
        {
          id: 1,
          message: `Hi ${user?.firstName} what do you want in your container ?`,
          sendAt: new Date(),
          sender: "bot",
          stack: ALL_STACK,
        },
      ]);

    //scroll to last message
    if (refLastMessage.current !== null) {
      //@ts-ignore
      refLastMessage.current.scrollIntoView();
    }
  }, [messages]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle ">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg flex gap-5 items-center justify-center leading-6 font-medium text-gray-900"
                  >
                    New container{" "}
                    <GiCardboardBoxClosed className="h-7 w-7 text-blue-400" />
                  </Dialog.Title>
                  <div className="mt-2 py-2 h-80 bg-gray-200 px-3 rounded-md overflow-y-scroll w-[500px]">
                    {messages.map((message) => {
                      return (
                        <RowMessage
                          key={message.id}
                          id={message.id}
                          message={message.message}
                          sendAt={message.sendAt}
                          sender={message.sender}
                          stack={message.stack}
                        />
                      );
                    })}
                    <div ref={refLastMessage}></div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className="h-10 w-full p-2 items-center gap-2 flex focus:ring-inset focus:outline-none rounded-lg border-blue-500 border-2">
                    {stackSelected.map((s, idx) => (
                      <span
                        className="bg-blue-500 cursor-pointer text-white px-2 py-1 rounded-sm"
                        key={idx}
                        onClick={() =>
                          setStackSelected((prev) =>
                            removeItemAtIndex(prev, idx),
                          )
                        }
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <button
                    className="h-10 btn-inline"
                    onClick={() => {
                      if (stackSelected.length > 0) createNewContainer();
                    }}
                  >
                    Create
                  </button>
                </div>
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={setOpen}
                >
                  Back to dashboard
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
