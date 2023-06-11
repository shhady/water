import { useState } from "react";

const useRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendFetchRequest = async (url, body, type) => {
    setLoading(true);
    setError(null);

    const requestOptions = {
      method: type,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    try {
      let response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      setLoading(false);
      return response.json();
    } catch (error) {
      console.error("Error sending request:", error);
      setLoading(false);
      setError(error);
    }
  };

  return { loading, error, sendFetchRequest };
};

export default useRequest;
