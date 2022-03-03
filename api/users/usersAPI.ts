import axios from "axios";
import { useQuery } from "react-query";

//methods

const fetchAllUsers = async () => {
  return await axios.get("http://localhost:8080/api/v1/users");
};

// hooks

export const useUsers = () => {
  const { isLoading, data, error, refetch } = useQuery(
    ["users"],
    async () => {
      const data = await fetchAllUsers();
      return data;
    },
    {
      staleTime: Infinity,
    },
  );

  return {
    isLoading,
    data,
    error,
    refetch,
  };
};
