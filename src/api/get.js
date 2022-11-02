import apiClient from "./apiClient";

export const getMessages = async ({ queryKey: [id, type] }) => {
  const response = await apiClient
    .get(`messages?receiver_id=${id}&receiver_class=${type}`)
    .catch((err) => {
      throw Error(err.message);
    });
  return await response?.data.data;
};
