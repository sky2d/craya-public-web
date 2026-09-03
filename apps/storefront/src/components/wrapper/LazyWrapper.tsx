"use client";

import { useInView } from "react-intersection-observer";

interface LazyWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function LazyWrapper({ children, className }: LazyWrapperProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "100px",
  });

  return (
    <div ref={ref} className={` ${className}`}>
      {inView ? children : <div className="h-56 w-full animate-pulse bg-red-950" />}
    </div>
  );
}
