const setHeaders = (headers) => {
  for (const header of headers) {
    if (
      header[0] === "access-token" ||
      header[0] === "client" ||
      header[0] === "expiry" ||
      header[0] === "uid"
    ) {
      localStorage.setItem(header[0], header[1]);
    }
  }
};

export default setHeaders;
