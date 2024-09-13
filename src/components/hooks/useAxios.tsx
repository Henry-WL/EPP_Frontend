import { useState } from "react";
import axios, { AxiosError } from "axios";

export const useAxios = () => {
  const [response, setResponse] = useState();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = async (url:string, method = "GET", data?: object, headers = {}) => {
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
        const axiosError = err as AxiosError
        if (axiosError) {
            setError(axiosError.message)
            setIsLoading(false)
            throw axiosError;
        } else {
            throw err
        }
    }
  };

  return { response, error, isLoading, sendRequest };
};
