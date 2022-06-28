import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { ReactTerminal } from "react-terminal";
import { useRecoilValue } from "recoil";
import { userState } from "../../../../store/store";

interface ISliderTerminal {
  isOpen: boolean;
  closeTerminal: () => any;
}

interface IMessageTerminal {
  date: Date;
  message: string;
  path?: string;
}

export default function SliderTerminal({
  closeTerminal,
  isOpen,
}: ISliderTerminal) {
  const [input, setInput] = useState("");
  const [messagesTerminal, setMessageTerminal] = useState<IMessageTerminal[]>(
    [],
  );

  const user = useRecoilValue(userState);

  const commands = {
    whoami: user ? user.lastName + " " + user.firstName : " ",
    cd: (directory: string) => `changed path to /${directory}`,
  };

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value as string);
  };

  const sendMessageTerminal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessageTerminal([
      ...messagesTerminal,
      {
        date: new Date(),
        message: input,
      },
    ]);
    setInput("");
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeTerminal}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="pointer-events-auto w-screen max-w-2xl">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          {" "}
                          Terminal{" "}
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={closeTerminal}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <div className="absolute inset-0 px-4 sm:px-6">
                        <ReactTerminal
                          commands={commands}
                          themes="material-ocean"
                        />
                        {/* 
                        <div className="h-full bg-black px-5 overflow-y-scroll">
                          {messagesTerminal.map(
                            (messageTerm: IMessageTerminal) => {
                              const { date, message, path } = messageTerm;

                              return (
                                <div className="flex flex-row gap-2 py-2">
                                  <div className="text-emerald-500 items-center flex gap-2">
                                    <span>
                                      {date.getDate() +
                                        "/" +
                                        date.getMonth() +
                                        "/" +
                                        date.getFullYear()}
                                    </span>
                                    <span>
                                      {date.getHours() +
                                        " : " +
                                        date.getMinutes() +
                                        " : " +
                                        date.getSeconds()}
                                    </span>
                                  </div>
                                  <label className="text-white">
                                    {message}
                                  </label>
                                </div>
                              );
                            },
                          )}
                          <div className="flex flex-row gap-2 py-2">
                            <div className="text-emerald-500 items-center flex gap-2">
                              <span>
                                {new Date().getDate() +
                                  "/" +
                                  new Date().getMonth() +
                                  "/" +
                                  new Date().getFullYear()}
                              </span>
                              <span>
                                {new Date().getHours() +
                                  " : " +
                                  new Date().getMinutes() +
                                  " : " +
                                  new Date().getSeconds()}
                              </span>
                            </div>
                            <form
                              onSubmit={sendMessageTerminal}
                              className="flex-1"
                            >
                              <input
                                className="py-1 px-2 text-white flex w-full flex-wrap bg-black cursor-text outline-none overflow-y-visible"
                                type="text"
                                value={input}
                                onChange={changeInput}
                              />
                              <button className="hidden" type="submit">
                                send
                              </button>
                            </form>
                          </div>
                        </div>*/}
                      </div>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
