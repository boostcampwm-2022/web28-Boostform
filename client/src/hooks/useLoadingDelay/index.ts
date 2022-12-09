import { useEffect, useState } from "react";

function useLoadingDelay(isLoading: boolean) {
  const [loadingDelay, setLoadingDelay] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setLoadingDelay(true);
      setTimeout(() => {
        setLoadingDelay(false);
      }, 250);
    }
  }, [isLoading]);

  return loadingDelay;
}

export default useLoadingDelay;
