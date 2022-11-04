import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import getHeaders from "../util/getHeaders";

const instance = () => {
  return axios.create({
    baseURL:
      process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_DEV_URL
        : process.env.REACT_APP_PROD_URL,
    headers: {
      "Content-Type": "application/json",
      ...getHeaders(),
    },
  });
};

export const auth = async (endpoint, body) => {
  const response = await instance()
    .post(`${endpoint}`, body)
    .catch((error) => {
      if (error.response) {
        return { errors: error.response.data.errors };
      } else if (error.code === "ERR_NETWORK") {
        return { errors: ["Network Error"] };
      } else {
        return { errors: ["An unexpected error occured."] };
      }
    });
  return response;
};

export const useSendMessage = (queryKey) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (body) => {
      return await instance().post(`messages`, body);
    },
    onError: (error) => {
      if (error?.code === "ERR_BAD_REQUEST") {
        navigate("/signin");
      } else {
        alert("An unexpected error occured.");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
        exact: true,
      });
    },
  });
};

export const useAddMember = (queryKey) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (body) => {
      return await instance().post(`channel/add_member`, body);
    },
    onError: (error) => {
      if (error?.code === "ERR_BAD_REQUEST") {
        navigate("/signin");
      } else {
        alert("An unexpected error occured.");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
        exact: true,
      });
    },
  });
};
