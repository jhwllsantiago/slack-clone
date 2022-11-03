const setHeaders = (headers) => {
  localStorage.setItem("access-token", headers["access-token"]);
  localStorage.setItem("client", headers.client);
  localStorage.setItem("expiry", headers.expiry);
  localStorage.setItem("uid", headers.uid);
};

export default setHeaders;
