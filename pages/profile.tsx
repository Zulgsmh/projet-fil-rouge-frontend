import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { FaDocker, FaUser } from "react-icons/fa";
import Container from "../components/global/Container";
import { UserContainerInstance } from "../components/UserPage/UserContainerInstance";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import {
  containerDetailsState,
  terminalState,
  userState,
} from "../store/store";
import { toast } from "react-toastify";
import { ModalCreateContainer } from "../components/UserPage/ModalCreateContainer";
import { fetchUserContainers } from "../api/containers/containerAPI";
import { signOut } from "../api/auth/authAPI";
import { IoReloadOutline } from "react-icons/io5";
import SliderTerminal from "../components/UserPage/Terminal/Slider/SliderTerminal";
import ContainerDetails from "../components/UserPage/ContainerDetails";

const Profile = () => {
  const router = useRouter();

  React.useEffect(() => {
    if (user === undefined) router.replace("/");
  });

  const [isOpenModalCreateContainer, setIsOpenModalCreateContainer] =
    React.useState(false);
  const [user, setUser] = useRecoilState(userState);
  const [sectionSelected, setSectionSelected] = useState("containers");
  const [terminal, setTerminal] = useRecoilState(terminalState);
  const [containerDetails, setContainerDetails] = useRecoilState(
    containerDetailsState,
  );

  console.log("User logged in : ", user);

  const {
    isLoading: containersIsLoading,
    data: containers,
    refetch: refetchContainers,
    isFetching,
  } = useQuery(
    ["containers"],
    async () => {
      const { data } = await fetchUserContainers(user!.id);
      console.log(data);
      return data;
    },
    { keepPreviousData: true, staleTime: 120_000 }, //keep data in memory for 2 min before re fetching
  );

  useEffect(() => {
    refetchContainers();
  }, []);

  /**
   *  //Remove jwt token and move user state to undefined then redirect
   */
  const logout = async () => {
    signOut().then(() => {
      setUser(undefined);
      router.replace("/");
    });
  };

  /**
   * @param id of the container
   * @description connect to the container
   */
  const connect = (id: string) => {
    toast.info("Connection to the container...");
    setTerminal({ ...terminal, isOpen: true });
  };

  return (
    <>
      {user && (
        <>
          <ModalCreateContainer
            open={isOpenModalCreateContainer}
            setOpen={() =>
              isOpenModalCreateContainer
                ? setIsOpenModalCreateContainer(false)
                : setIsOpenModalCreateContainer(true)
            }
          />

          <div className="h-screen flex">
            {terminal.isOpen && (
              <SliderTerminal
                isOpen={terminal.isOpen}
                closeTerminal={() =>
                  setTerminal({ ...terminal, isOpen: false })
                }
              />
            )}
            {/* Sidebar */}
            <div className="w-1/4 bg-indigo-600 h-full text-white p-5">
              <h3 className="text-2xl mb-5">My easy container</h3>
              <div className="flex flex-col gap-3">
                <div
                  onClick={() => setSectionSelected("containers")}
                  className={`${
                    sectionSelected === "containers" && "bg-indigo-800"
                  } rounded-md mx-2 my-1 flex items-center gap-4 h-12 px-2 cursor-pointer hover:bg-indigo-500`}
                >
                  <FaDocker className="h-6 w-6" />
                  <h4 className="text-lg">Mes applications</h4>
                </div>
                <div
                  className={`${
                    sectionSelected === "profil" && "bg-indigo-800"
                  } rounded-md mx-2 my-1 flex items-center gap-4 h-12 px-2 cursor-pointer hover:bg-indigo-500`}
                  onClick={() => setSectionSelected("profil")}
                >
                  <FaUser className="h-6 w-6" />
                  <h4 className="text-lg">Mon profil</h4>
                </div>

                <button onClick={logout} className="btn-inline">
                  Logout
                </button>
              </div>
            </div>
            {/* Body */}
            <div className="flex flex-1">
              <Container className="mt-10 w-full">
                <>
                  {sectionSelected === "containers" && (
                    <>
                      <div className="flex w-full items-center justify-between mb-10">
                        <div className="flex flex-col">
                          <label className="text-lg">
                            {user?.firstName + " " + user?.lastName}
                          </label>
                          <label className="text-sm text-gray-400">
                            {user?.email}
                          </label>
                        </div>

                        <h2 className="text-xl">My Containers</h2>
                        <button
                          className="btn-inline"
                          onClick={() => setIsOpenModalCreateContainer(true)}
                        >
                          New container
                        </button>
                      </div>
                      {/* all user container */}
                      <div className="flex flex-col w-full gap-5">
                        {containersIsLoading && (
                          <label>Fetching your containers...</label>
                        )}
                        {containers &&
                          containers.containers &&
                          containers.containers.length > 0 &&
                          //@ts-ignore
                          containers.containers.map((container: any) => {
                            console.log("my container, ", container);
                            const {
                              createdAt,
                              dns,
                              dockerContainerId,
                              id,
                              ipAddress,
                              name,
                              privateKey,
                              servicesInstalled,
                            } = container.c1;

                            const { Created, Image, ImageID, State, Status } =
                              container.c2;

                            return (
                              <>
                                <UserContainerInstance
                                  id={id}
                                  name={name}
                                  available={
                                    Status === "Started" ? true : false
                                  }
                                  baseImage="ubuntu"
                                  connect={connect}
                                  stack={servicesInstalled}
                                  key={id}
                                  dockerContainerId={dockerContainerId}
                                />
                                {containerDetails.idContainer === id && (
                                  <ContainerDetails
                                    createdAt={Created}
                                    ipAddress={ipAddress}
                                    idImage={ImageID}
                                    image={Image}
                                    state={State}
                                    status={Status}
                                    key={ImageID}
                                  />
                                )}
                              </>
                            );
                          })}
                        {containers &&
                          containers.containers &&
                          containers.containers.length === 0 && (
                            <div className="flex items-center gap-5">
                              <div className="text-xl text-gray-500">
                                No containers found.
                              </div>
                              <IoReloadOutline
                                className="h-10 w-10 hover:bg-gray-200 p-2 rounded-full cursor-pointer"
                                onClick={() => refetchContainers()}
                              />
                            </div>
                          )}
                      </div>
                    </>
                  )}
                </>
              </Container>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
