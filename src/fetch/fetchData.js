//import axios from "axios";
//import getHeaders from "../util/getHeaders";
import apiClient from "./apiClient";

const fetchData = async ({ queryKey }) => {
  // eslint-disable-next-line
  const [_, endpoint] = queryKey;
  //const { accessToken, client, expiry, uid } = getHeaders();
  //const url = `http://206.189.91.54/api/v1/${endpoint}`;
  // const options = {
  //   //method: "GET",
  //   headers: {
  //     "access-token": accessToken,
  //     client,
  //     expiry,
  //     uid,
  //   },
  // };
  //return fetch(url, options).then((res) => res.json());
  return await apiClient.get(`/${endpoint}`);
};

export default fetchData;
