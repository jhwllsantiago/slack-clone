const getHeaders = () => {
  const accessToken = localStorage.getItem("access-token");
  const client = localStorage.getItem("client");
  const expiry = localStorage.getItem("expiry");
  const uid = localStorage.getItem("uid");

  return { "access-token": accessToken, client, expiry, uid };
};

export default getHeaders;
