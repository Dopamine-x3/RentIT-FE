import { useEffect, useRef } from "react";

/**
 * useInfiniteScroll Hook
 *
 * @param {Object} params - Parameters for the hook
 * @param {Function} params.callback - Function to call when scrolled to the bottom
 * @param {boolean} params.hasMore - Flag to indicate if there are more items to load
 * @param {number} [params.threshold=0.5] - Intersection observer threshold
 * @param {Element|null} [params.root=null] - Intersection observer root
 * @param {string} [params.rootMargin="0px"] - Intersection observer root margin
 *
 * @returns {Object} - Ref object for the element to observe
 */
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
