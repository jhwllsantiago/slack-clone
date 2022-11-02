import getHeaders from "../util/getHeaders";

const postMessage = async (body) => {
  const { accessToken, client, expiry, uid } = getHeaders();
  return await fetch("http://206.189.91.54/api/v1/messages", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "access-token": accessToken,
      client,
      expiry,
      uid,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.errors) {
        return { success: false };
      } else {
        return { success: true };
      }
    });
};

export default postMessage;