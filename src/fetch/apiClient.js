import axios from "axios";
import getHeaders from "../util/getHeaders";
const { accessToken, client, expiry, uid } = getHeaders();

export default axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_DEV_URL
      : process.env.REACT_APP_PROD_URL,
  headers: {
    "Content-type": "application/json",
    "access-token": accessToken,
    client,
    expiry,
    uid,
  },
});
