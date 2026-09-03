"use client";
import "@egjs/flicking-plugins/dist/arrow.css";
import "@egjs/flicking-plugins/dist/flicking-plugins.css";
import "@egjs/flicking/dist/flicking.css";
import gsap from "gsap/all";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { StorefrontComponentProps } from "../../interfaces";

import { useContainerWidth, useWindowWidth } from "../../hooks/useWindowWidth";
import ImageSkeletonLoader from "../../major/ImageSkeletonLoader";
import { IMAGE_CAROUSEL_PREVIEW_DATA } from "../data";

export const ImageCarousel: React.FC<StorefrontComponentProps> = ({ data = IMAGE_CAROUSEL_PREVIEW_DATA }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const prevIndexRef = useRef<number>(0); // CHANGED: Ref to store the previous index
  const [loaded, setLoaded] = useState<boolean[]>([]);
  const { containerRef, containerWidth } = useContainerWidth();
  const windowWidth = useWindowWidth();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % imageSet.length);
    }, 6000);
  };

  const imageSet = useMemo(() => {
    if (!containerWidth) return [];
    return containerWidth < windowWidth * 0.4 || windowWidth < 600 ? data.imageCarouselImages?.android : data.imageCarouselImages?.web;
  }, [containerWidth, data, windowWidth]);

  useEffect(() => {
    imageRefs.current = imageRefs.current.slice(0, imageSet.length);
    timeline.current = gsap.timeline({ paused: true });

    imageSet.forEach((_, index) => {
      if (imageRefs.current[index]) {
        gsap.set(imageRefs.current[index], {
          autoAlpha: index === 0 ? 1 : 0,
        });
      }
    });

    startAutoPlay();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      timeline.current?.kill();
    };
  }, [imageSet]);

  useEffect(() => {
    if (!imageSet.length || !timeline.current) return;

    // CHANGED: Use the ref to get the actual previous index
    const prevIndex = prevIndexRef.current;

    // CHANGED: Prevent animation if the index hasn't changed
    if (prevIndex === currentIndex) return;

    timeline.current.clear();

    const prevImage = imageRefs.current[prevIndex];
    const currentImage = imageRefs.current[currentIndex];

    if (prevImage && currentImage) {
      timeline.current
        .to(prevImage, {
          autoAlpha: 0,
          duration: 1,
          ease: "power2.inOut",
        })
        .to(
          currentImage,
          {
            autoAlpha: 1, // CHANGED: Corrected value from 1.3 to 1
            duration: 1,
            ease: "power2.inOut",
          },
          0.5, // Overlap a bit
        )
        .fromTo(
          currentImage.querySelector("img"),
          { scale: 1.15 },
          {
            scale: 1,
            duration: 2.5,
            ease: "power2.out",
          },
          0.5,
        );

      timeline.current.play();
    }

    // CHANGED: Update the ref with the new index for the next transition
    prevIndexRef.current = currentIndex;
  }, [currentIndex, imageSet]);

  const aspectRatio = useMemo(() => {
    if (containerWidth === 0) {
      return windowWidth < 600 ? "1/1.13" : "1/0.37";
    }
    return containerWidth < windowWidth * 0.4 || windowWidth < 600 ? "1/1.13" : "1/0.37";
  }, [containerWidth, windowWidth]);

  const primaryColor = data.store?.primaryColor || "#000";

  const dotStyle = useMemo(
    () => (index: number) => ({
      backgroundColor: index === currentIndex ? primaryColor : "white",
      border: `1px solid ${primaryColor}`,
    }),
    [currentIndex, primaryColor],
  );

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    startAutoPlay();
  };

  return (
    <div ref={containerRef} style={{ aspectRatio }} className="relative w-full overflow-hidden bg-black-dark1">
      {imageSet.map((imageSrc, index) => (
        <div
          key={index}
          ref={el => {
            imageRefs.current[index] = el;
          }}
          className={`absolute inset-0 h-full w-full ${loaded[index] ? "bg-black-dark1" : "bg-white-light4"}`}
        >
          {!loaded[index] && <ImageSkeletonLoader aspectRatio={aspectRatio} />}
          <Image
            src={imageSrc.fileUrl}
            sizes="100vw"
            alt={`Carousel Image ${index + 1}`}
            fill
            onLoad={() => {
              setLoaded(prev => {
                const next = [...prev];
                next[index] = true;
                return next;
              });
            }}
            draggable={false}
            className="h-full w-full object-cover"
            priority={index === 0}
          />
        </div>
      ))}

      {imageSet.length > 1 && (
        <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 space-x-1">
          {imageSet.map((_, index) => (
            <div
              key={index}
              className="h-2 w-2 cursor-pointer rounded-full p-1 transition-all duration-300"
              style={dotStyle(index)}
              onClick={() => handleDotClick(index)}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
