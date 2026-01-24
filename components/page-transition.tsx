"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const PageTransition = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const pathName = usePathname();

  useEffect(() => {
    if (!overlayRef.current || !textRef.current) return;

    // Timeline for the transition animation
    const timeline = gsap.timeline();

    // Animate in: overlay comes from bottom, Nokras text appears
    timeline
      .to(
        overlayRef.current,
        {
          clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0% 0%)",
          duration: 0.6,
          ease: "power2.inOut",
        },
        0
      )
      .from(
        textRef.current,
        {
          opacity: 0,
          scale: 0.8,
          duration: 0.4,
          ease: "back.out",
        },
        0.1
      )
      .to(
        textRef.current,
        {
          opacity: 0,
          scale: 1.2,
          duration: 0.4,
          ease: "power2.in",
          delay: 0.3,
        }
      )
      .to(
        overlayRef.current,
        {
          clipPath: "polygon(0 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 0.6,
          ease: "power2.inOut",
        },
        "-=0.3"
      );
  }, [pathName]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black z-50 pointer-events-none"
      style={{
        clipPath: "polygon(0 0%, 100% 0%, 100% 0%, 0% 0%)",
      }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <div
          ref={textRef}
          className="opacity-0"
        >
          <h1 className="text-8xl md:text-9xl font-black text-white text-center leading-none">
            Nokras
          </h1>
        </div>
      </div>
    </div>
  );
};

export default PageTransition;
