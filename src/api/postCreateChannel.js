import getHeaders from "../util/getHeaders";

const postCreateChannel = async (body) => {
  const { accessToken, client, expiry, uid } = getHeaders();
  return await fetch("http://206.189.91.54/api/v1/channels", {
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
        return { success: false, errors: result.errors };
      } else {
        return { success: true, details: result.data };
      }
    });
};

export default postCreateChannel;
