import axios from "axios";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { userState } from "../../store/store";
import { getToken } from "../auth/authAPI";

export type CreateContainerType = {
  name: string;
  servicesInstalled: string[];
  userId: string;
};

export const createContainer = async (container: CreateContainerType) => {
  await axios
    .post("http://localhost:8080/api/v1/containers", container, {
      headers: { Authorization: "Bearer " + getToken() },
    })
    .then((res) => {
      console.log(res.data);
      toast.success("Container created");
    })
    .catch((e) => {
      toast.error("Unable to create the container");
    });
};

export const fetchUserContainers = async (userId: string) => {
  if (userId) {
    return await axios
      .get(`http://localhost:8080/api/v1/containers/user/${userId}`, {
        //prettier-ignore
        headers: { "Authorization": "Bearer " + getToken() },
      })
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((e) => {
        console.log(e);
        toast.error("Unable to load your containers");
      });
  }
};

//fetch containers instances of the user
export const useContainers = () => {
  const userId = useRecoilValue(userState)!.id;

  const { isLoading, data, refetch, isFetching } = useQuery(
    ["containers"],
    async () => {
      return await fetchUserContainers(userId);
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
