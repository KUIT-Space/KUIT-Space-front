import { useEffect, useRef } from "react";

const useVisualViewportResize = () => {
  const ref = useRef<HTMLDivElement>(null);

  const handleVisualViewportResize = (event: Event) => {
    const visualViewportHeight = window.visualViewport?.height;
    if (visualViewportHeight && ref.current) {
      ref.current.style.transition = "height 0.3s ease-out";
      ref.current.style.height = `${visualViewportHeight}px`;
    }
  };

  useEffect(() => {
    const resizeAbortController = new AbortController();

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleVisualViewportResize, {
        signal: resizeAbortController.signal,
      });
    }

    return () => {
      resizeAbortController.abort();
    };
  }, []);

  return ref;
};

export default useVisualViewportResize;
