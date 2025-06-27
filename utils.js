import { useEffect, useState } from "react";

export function convertDate(oldDate) {
  const date = new Date(oldDate);
  const formatted = date.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return formatted;
}

const useApiRequest = (apiFunction, param) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    apiFunction(param)
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        setError(err.msg);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [apiFunction, param]);

  return { data, setData, loading, error };
};

export default useApiRequest;
