import { useState, useEffect } from "react";
import getHeaders from "../util/getHeaders";

const useGET = (endpoint) => {
  const { accessToken, client, expiry, uid } = getHeaders();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    setIsLoading(true);
    fetch(`http://206.189.91.54/api/v1/${endpoint}`, {
      method: "GET",
      headers: {
        "access-token": accessToken,
        client,
        expiry,
        uid,
      },
      signal: abortController.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw Error("An unexpected error occured.");
        }
        return response.json();
      })
      .then((result) => {
        setIsLoading(false);
        setData(result.data);
        setError(null);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setIsLoading(false);
          setError(error.message);
        }
      });
    return () => abortController.abort(); // eslint-disable-next-line
  }, [endpoint]);

  return { data, isLoading, error };
};

export default useGET;
