import axios from "axios";
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
