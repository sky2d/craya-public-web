"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useRef } from "react";
import { slides } from "./slides/slideData";

gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
  const sectionWrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!triggerRef.current || !itemsRef.current) return;

      const slideWidth = window.innerWidth; // Width of each slide
      const totalSlides = slides.length;
      const totalScrollDistance = slideWidth * (totalSlides - 1); // Total scroll distance

      if (totalSlides <= 1) {
        triggerRef.current.style.visibility = "hidden";
        return;
      } else {
        triggerRef.current.style.visibility = "visible";
      }

      // const numSegments = totalSlides - 1;

      gsap.to(itemsRef.current, {
        // <--- Just call gsap.to directly
        x: () => `-${totalScrollDistance}px`,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: () => `+=${totalScrollDistance}`,
          pin: true,
          scrub: true,
          snap: {
            snapTo: 1 / (totalSlides - 1),
            duration: 0.3,
            ease: "power2.inOut",
          },
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, sectionWrapperRef);

    return () => ctx.revert();
  }, [slides]);

  return (
    <section ref={sectionWrapperRef} className="relative snap-start overflow-x-hidden">
      <div ref={triggerRef} className="sticky h-screen">
        <div className="top-0 h-full overflow-hidden">
          <div ref={itemsRef} className="absolute left-0 top-0 flex h-full w-max">
            {slides.map(({ component: SlideComponent, backgroundColor }, index) => (
              <div
                key={index}
                style={{ backgroundColor }}
                className={`flex h-screen w-screen shrink-0 items-center justify-center overflow-hidden text-center transition-opacity duration-300 ease-in-out ${index === 5 ? "bg-[linear-gradient(180deg,_#7C54E9_0%,_rgba(124,84,233,0.96)_30%,_rgba(124,84,233,0.96)_50%,_rgba(124,84,233,0.96)_60.5%,_rgba(124,84,233,0)_90%)]" : ""}`}
              >
                <SlideComponent />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
