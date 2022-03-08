import axios from "axios";
import { toast } from "react-toastify";
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
      console.log(e);
      toast.error("Unable to create the container");
    });
};

export const fetchUserContainers = async (userId: string) => {
  return await axios
    .get(`http://localhost:8080/api/v1/containers/user/${userId}`, {
      headers: { Authorization: "Bearer " + getToken() },
    })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((e) => {
      console.log(e);
      toast.error("Unable to load your containers");
    });
};

export const deleteContainer = async (userId: string, containerId: string) => {
  if (userId) {
    return await axios
      .delete(
        `http://localhost:8080/api/v1/containers?userId=${userId}&containerId=${containerId}`,
        {
          headers: { Authorization: "Bearer " + getToken() },
        },
      )
      .then((res) => {
        console.log(res.data);
        toast.success("Container deleted successfully");
        return res.data;
      })
      .catch((e) => {
        console.log(e);
        toast.error("Unable to delete the container");
      });
  }
};
