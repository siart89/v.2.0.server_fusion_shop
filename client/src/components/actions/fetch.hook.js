import { useState, useCallback } from 'react';

const useFetch = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetching = useCallback(async (url, method = 'GET', headers = {}, body = null) => {
    setIsLoading(true);
    try {
      const resp = await fetch(url, {
        method,
        headers,
        body,
      });
      const data = await resp.json();
      if (!resp.ok) {
        console.log(data.erros);
        if (data.erros) {
          setIsLoading(false);
          const erArr = {};
          data.erros.forEach((er) => {
            erArr[er.param] = er.msg;
          });
          throw new Error(JSON.stringify(erArr));
        }
        throw new Error(data.message || 'Что-то пошло не так');
      }
      setIsLoading(false);
      return data;
    } catch (e) {
      setIsLoading(false);
      setError(e.message);
      throw e;
    }
  }, []);
  const clearErr = useCallback(() => setError(null), []);
  return {
    fetching,
    error,
    isLoading,
    clearErr,
  };
};

export default useFetch;
