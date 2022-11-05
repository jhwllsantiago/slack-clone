import axios from "axios";
import getHeaders from "../util/getHeaders";

const instance = () => {
  return axios.create({
    baseURL:
      process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_DEV_URL
        : process.env.REACT_APP_PROD_URL,
    headers: getHeaders(),
  });
};

export const getUsers = async () => {
  const response = await instance().get(`users`);
  return await response?.data.data;
};

export const getMessages = async ({ queryKey: [id, type] }) => {
  const response = await instance().get(
    `messages?receiver_id=${id}&receiver_class=${type}`
  );
  return await response?.data.data;
};

export const getChannelList = async () => {
  const response = await instance().get(`channels`);
  return (await response?.data.data) ?? [];
};

export const getChannelDetails = async ({ queryKey: [id] }) => {
  const response = await instance().get(`channels/${id}`);
  return await response?.data.data;
};
