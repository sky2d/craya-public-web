"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image, { StaticImageData } from "next/image";
import { useCallback, useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type HorizontalScrollImageProps = {
  imageSrc: string | StaticImageData;
  alt?: string;
};

const HorizontalScrollImage = ({ imageSrc, alt = "Scrolling Image" }: HorizontalScrollImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollSpacerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null); // for direct access to img element

  const setupScrollTrigger = useCallback(() => {
    const container = containerRef.current;
    const scrollSpacer = scrollSpacerRef.current;
    const image = imageRef.current;

    if (!container || !scrollSpacer || !image) return;

    if (image.scrollWidth < 10 || container.offsetWidth < 10) {
      setTimeout(setupScrollTrigger, 200);
      return;
    }

    const imageWidth = image.scrollWidth;
    const containerWidth = container.offsetWidth;
    const scrollDistance = imageWidth - containerWidth;

    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.trigger === container) {
        trigger.kill();
      }
    });
    gsap.killTweensOf(image);

    if (scrollDistance > 0) {
      gsap.set(scrollSpacer, {
        height: scrollDistance + container.offsetHeight,
      });

      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: () => `+=${scrollDistance}`,
        pin: true,
        pinSpacing: false,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        animation: gsap.to(image, {
          x: -scrollDistance,
          ease: "none",
        }),
      });
    } else {
      gsap.set(image, { x: 0 });
    }
  }, []);

  const handleResize = useCallback(() => {
    setTimeout(setupScrollTrigger, 50);
  }, [setupScrollTrigger]);

  const handleImageLoad = useCallback(() => {
    setupScrollTrigger();
  }, [setupScrollTrigger]);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;

    if (image) {
      if (image.complete && image.naturalWidth > 0) {
        handleImageLoad();
      } else {
        image.addEventListener("load", handleImageLoad);
        image.addEventListener("error", () => console.error("Image failed to load. Cannot setup ScrollTrigger."));
      }
    } else {
      const timer = setTimeout(setupScrollTrigger, 100);
      return () => clearTimeout(timer);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      if (image) {
        image.removeEventListener("load", handleImageLoad);
        image.removeEventListener("error", () => {});
      }
      window.removeEventListener("resize", handleResize);

      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === container) {
          trigger.kill();
        }
      });
      gsap.killTweensOf(image);
    };
  }, [handleImageLoad, handleResize, setupScrollTrigger]);

  return (
    <div ref={scrollSpacerRef} className="w-full">
      <section className="bg-gray-100 relative h-screen w-full overflow-hidden" ref={containerRef}>
        <div ref={imageWrapperRef}>
          <Image
            draggable={false}
            src={imageSrc}
            alt={alt}
            ref={el => {
              imageRef.current = el as HTMLImageElement | null;
            }}
            priority
            unoptimized // optional: remove if optimizing images
            className="absolute left-0 top-0 h-full w-auto max-w-none object-contain"
            width={1920}
            height={1080}
          />
        </div>
      </section>
    </div>
  );
};

export default HorizontalScrollImage;
