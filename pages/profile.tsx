import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { FaDocker, FaUser } from "react-icons/fa";
import Container from "../components/global/Container";
import { UserContainerInstance } from "../components/UserPage/UserContainerInstance";
import { useRouter } from "next/router";
import { signOut } from "../api/auth/authAPI";
import { useRecoilState } from "recoil";
import { userState } from "../store/store";
import { toast } from "react-toastify";

const Profile = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  React.useEffect(() => {
    if (user === undefined) router.replace("/");
  });

  const [user, setUser] = useRecoilState(userState);
  console.log("user logged in : ", user);

  const [sectionSelected, setSectionSelected] = useState("containers");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  /**
   *  //Remove jwt token and move user state to undefined then redirect
   */
  const logout = async () => {
    signOut().then(() => {
      setUser(undefined);
      router.replace("/");
    });
  };

  //fetch containers instances of the user
  const useContainers = (email: string) => {
    const { isLoading, data, refetch, isFetching } = useQuery(
      ["containers"],
      async () => {
        const res = await axios.get("");
        return res.data;
      },
      { keepPreviousData: false, staleTime: 120_000 }, //keep data in memory for 2 min before re fetching
    );
    return {
      data,
      isLoading,
      refetch,
      isFetching,
    };
  };

  const { mutate: createContainer } = useMutation(
    async () => {
      await axios.post(""); //pass some data);
    },
    {
      onSuccess: () => {
        //refetch containers data
        queryClient.invalidateQueries(["containers"]);
      },
    },
  );

  useEffect(() => {}, []);

  /**
   * @param id of the container
   * @description connect to the container
   */
  const connect = (id: string) => {
    toast.info("Connection to the container...");
  };

  return (
    <>
      <div className="h-screen flex">
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
                    <button className="btn-inline">New container</button>
                  </div>
                  {/* all user container */}
                  <div className="flex flex-col w-full gap-5">
                    <UserContainerInstance
                      id="GEZIRGNEZKR"
                      name="Python course env"
                      available={true}
                      baseImage="centOS"
                      connect={connect}
                      ram="8GB"
                      stack={["Python", "Jupyter", "CentOS", "Java"]}
                      storage="128Go"
                      key="1"
                    />
                    <UserContainerInstance
                      id="GEZIRGNEZKR"
                      name="Java env"
                      available={false}
                      baseImage="ubuntu"
                      connect={connect}
                      ram="8GB"
                      stack={["Java", "openJDK 1.8", "Spring"]}
                      storage="128Go"
                      key="2"
                    />
                    <UserContainerInstance
                      id="GEZIRGNEZKR"
                      name="Kubernetes"
                      available={false}
                      baseImage="windows"
                      connect={connect}
                      ram="16GB"
                      stack={["Kube", "Python", "Ansible", "Docker"]}
                      storage="56Go"
                      key="3"
                    />
                  </div>
                </>
              )}
            </>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Profile;
