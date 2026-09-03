import { useEffect, useRef, useState } from "react";

const getWindowWidth = () => (typeof window !== "undefined" ? window.innerWidth : 0);

export const useWindowWidth = (): number => {
  const [windowWidth, setWindowWidth] = useState(getWindowWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
};

export const useContainerWidth = <T extends HTMLElement = HTMLDivElement>() => {
  const containerRef = useRef<T | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateSize(); // Run on mount

    const resizeObserver = new ResizeObserver(updateSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  return { containerRef, containerWidth };
};
