import { useState, useEffect } from "react";
import axios from "axios";

export const useAxios = () => {
  const [response, setResponse] = useState();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = async (url, method = "GET", data, headers = {}) => {
    setIsLoading(true)
    try {
        const axiosConfig = {
            url: `${import.meta.env.VITE_BASE_URL}${url}`,
            method,
            data,
            headers
        }
      const responseData = await axios(axiosConfig)
      setResponse(responseData.data)
      setIsLoading(false)
      return responseData;
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
      throw err;
    }
  };

  return { response, error, isLoading, sendRequest };
};
