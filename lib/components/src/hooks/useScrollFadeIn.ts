import gsap from "gsap";
import { useEffect } from "react";

interface ScrollFadeInOptions {
  selector: string;
  scale?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
}

export const useScrollFadeIn = ({ selector, scale = 1, duration = 0.5, delay = 0, stagger = 0.1 }: ScrollFadeInOptions) => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;

            gsap.to(el, {
              opacity: 1,
              y: 0,
              scale,
              duration,
              delay: delay + index * stagger,
              ease: "power2.out",
            });

            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.1,
      },
    );

    elements.forEach(el => {
      gsap.set(el, { opacity: 0, y: 20, scale: 0.95 });
      observer.observe(el);
    });

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, [selector, scale, duration, delay, stagger]);
};
