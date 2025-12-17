import { useEffect, useState } from "react";

export const useMinDelay = (loading: boolean, delay = 400) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setReady(true), delay);
      return () => clearTimeout(timer);
    }
  }, [delay, loading]);

  return ready;
};
