import { useEffect, useRef } from "react";

export const useInfiniteScroll = ({
  callback,
  hasMore,
  threshold = 0.5,
  root = null,
  rootMargin = "0px",
}) => {
  const observer = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!hasMore) return;
    if (observer.current) observer.current.disconnect();

    const options = {
      root,
      rootMargin,
      threshold,
    };

    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback();
      }
    }, options);

    if (bottomRef.current) {
      observer.current.observe(bottomRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [callback, hasMore, threshold, root, rootMargin]);

  return bottomRef;
};
