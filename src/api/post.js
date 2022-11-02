import axios from "axios";

const instance = () => {
  return axios.create({
    baseURL:
      process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_DEV_URL
        : process.env.REACT_APP_PROD_URL,
    headers: {
      "access-token": localStorage.getItem("access-token"),
      client: localStorage.getItem("client"),
      expiry: localStorage.getItem("expiry"),
      uid: localStorage.getItem("uid"),
    },
  });
};

export const postSignIn = async (body) => {
  const response = await instance()
    .post(`auth/sign_in`, body)
    .catch((err) => {
      throw Error(err.message);
    });
  return await response?.data.data;
};
