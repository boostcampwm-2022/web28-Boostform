import { useEffect, RefObject } from "react";

function useIntersectionObserver(ref: RefObject<HTMLElement>, callback: () => void) {
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (window.innerHeight === entry.intersectionRect.top && entry.isIntersecting) callback();
    });

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, callback]);
}

export default useIntersectionObserver;
