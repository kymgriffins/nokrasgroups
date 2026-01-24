"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { nokrasCompanyInfo } from "@/mock-data/restaurants";

gsap.registerPlugin(ScrollTrigger);

/**
 * Advanced GSAP Animation Utilities for Restaurant Showcase
 * Provides reusable animation sequences for scroll-engineered interactions
 */

interface AnimationTimeline {
  kill: () => void;
}

/**
 * Bento Grid Stagger Animation
 * Used for amenities/features grid in restaurant details
 */
export const createBentoGridAnimation = (
  containerSelector: string,
  triggerElement?: HTMLElement
): AnimationTimeline => {
  const container = document.querySelector(containerSelector);
  if (!container) return { kill: () => {} };

  const items = container.querySelectorAll("[data-bento-item]");
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement || container,
      start: "top 70%",
      end: "top 20%",
      scrub: 1,
      markers: false,
    },
  });

  items.forEach((item, index) => {
    tl.from(
      item,
      {
        y: 60,
        opacity: 0,
        scale: 0.95,
        duration: 0.6,
        ease: "back.out(1.5)",
      },
      index * 0.08
    );

    // Add hover animation setup
    item.addEventListener("mouseenter", () => {
      gsap.to(item, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    });

    item.addEventListener("mouseleave", () => {
      gsap.to(item, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  });

  return {
    kill: () => {
      tl.kill();
      items.forEach((item) => {
        item.removeEventListener("mouseenter", () => {});
        item.removeEventListener("mouseleave", () => {});
      });
    },
  };
};

/**
 * Horizontal Scroll Gallery Animation
 * Creates smooth horizontal scrolling for image galleries
 */
export const createHorizontalScrollAnimation = (
  containerSelector: string,
  speed: number = 1.5
): AnimationTimeline => {
  const container = document.querySelector(containerSelector);
  if (!container) return { kill: () => {} };

  const items = container.querySelectorAll("[data-gallery-item]");
  const totalWidth = items.length * (window.innerWidth * 0.8);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: `+=${totalWidth}`,
      scrub: speed,
      pin: true,
      anticipatePin: 1,
      markers: false,
    },
  });

  tl.to(
    container.querySelector("[data-scroll-wrapper]"),
    {
      x: -totalWidth + window.innerWidth,
      duration: 1,
      ease: "none",
    },
    0
  );

  return {
    kill: () => tl.kill(),
  };
};

/**
 * Pinned Scale Hero Animation
 * Creates Apple-style scale-up effect with viewport pinning
 */
export const createPinnedScaleHero = (
  heroSelector: string,
  textSelector: string
): AnimationTimeline => {
  const hero = document.querySelector(heroSelector);
  const text = document.querySelector(textSelector);

  if (!hero || !text) return { kill: () => {} };

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "center center",
      scrub: 2,
      pin: true,
      anticipatePin: 1,
      markers: false,
    },
  });

  tl.to(
    hero,
    {
      scale: 1.2,
      duration: 1,
      ease: "power1.inOut",
    },
    0
  );

  tl.to(
    text,
    {
      scale: 1.5,
      opacity: 0.6,
      duration: 1,
      ease: "power1.inOut",
    },
    0
  );

  return {
    kill: () => tl.kill(),
  };
};

/**
 * Magnetic Hover Effect
 * Creates cursor-following magnetism on interactive elements
 */
export const createMagneticHover = (
  elementSelector: string,
  strength: number = 0.3
): void => {
  const elements = document.querySelectorAll(elementSelector);

  elements.forEach((element) => {
    const el = element as HTMLElement;

    el.addEventListener("mousemove", (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = (e.clientX - centerX) * strength;
      const mouseY = (e.clientY - centerY) * strength;

      gsap.to(el, {
        x: mouseX,
        y: mouseY,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    });

    el.addEventListener("mouseleave", () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.4)",
        overwrite: "auto",
      });
    });
  });
};

/**
 * Staggered Text Reveal Animation
 * Reveals text word by word or letter by letter
 */
export const createTextReveal = (
  textSelector: string,
  mode: "word" | "letter" = "word",
  triggerElement?: HTMLElement
): AnimationTimeline => {
  const element = document.querySelector(textSelector);
  if (!element) return { kill: () => {} };

  const text = element.textContent || "";
  const splitText = mode === "word" ? text.split(" ") : text.split("");

  element.innerHTML = splitText
    .map(
      (item) =>
        `<span class="text-reveal-item" style="display: inline-block; overflow: hidden;"><span style="display: inline-block;">${item}</span></span>`
    )
    .join(mode === "word" ? " " : "");

  const items = element.querySelectorAll(".text-reveal-item");

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement || element,
      start: "top 80%",
      toggleActions: "play none none reverse",
      markers: false,
    },
  });

  items.forEach((item, index) => {
    tl.from(
      item,
      {
        y: 40,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      index * 0.05
    );
  });

  return {
    kill: () => {
      tl.kill();
      element.innerHTML = text;
    },
  };
};

/**
 * Parallax Image Animation
 * Creates depth effect with variable parallax speeds
 */
export const createParallaxImage = (
  imageSelector: string,
  strength: number = -100
): AnimationTimeline => {
  const image = document.querySelector(imageSelector);
  if (!image) return { kill: () => {} };

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: image.parentElement,
      start: "top center",
      end: "bottom center",
      scrub: 1.2,
      markers: false,
    },
  });

  tl.to(
    image,
    {
      y: strength,
      duration: 1,
      ease: "none",
    },
    0
  );

  return {
    kill: () => tl.kill(),
  };
};

/**
 * RGB Shift Post-Processing Effect
 * Creates chromatic aberration on scroll
 */
export const createRGBShiftEffect = (
  elementSelector: string
): AnimationTimeline => {
  const element = document.querySelector(elementSelector);
  if (!element) return { kill: () => {} };

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return { kill: () => {} };

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start: "top center",
      end: "bottom center",
      scrub: 2,
      markers: false,
    },
  });

  let rgbShift = 0;

  tl.to(
    { rgbShift: 0 },
    {
      rgbShift: 15,
      duration: 1,
      ease: "sine.inOut",
      onUpdate: function () {
        rgbShift = (this.targets()[0] as any).rgbShift;
        const filter = `drop-shadow(${rgbShift}px 0 0 rgba(255, 0, 0, 0.3)) 
                        drop-shadow(-${rgbShift}px 0 0 rgba(0, 0, 255, 0.3))`;
        (element as HTMLElement).style.filter = filter;
      },
    },
    0
  );

  return {
    kill: () => {
      tl.kill();
      (element as HTMLElement).style.filter = "none";
    },
  };
};

/**
 * Counter Animation
 * Animates numbers from 0 to target value
 */
export const createCounterAnimation = (
  elementSelector: string,
  targetValue: number,
  duration: number = 2,
  triggerElement?: HTMLElement
): AnimationTimeline => {
  const element = document.querySelector(elementSelector);
  if (!element) return { kill: () => {} };

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement || element,
      start: "top 80%",
      toggleActions: "play none none reverse",
      markers: false,
    },
  });

  const obj = { value: 0 };

  tl.to(obj, {
    value: targetValue,
    duration,
    ease: "power2.out",
    onUpdate: () => {
      (element as HTMLElement).textContent = Math.round(obj.value).toString();
    },
  });

  return {
    kill: () => tl.kill(),
  };
};

/**
 * Custom Hook for Managing GSAP Animations
 */
export const useGsapAnimation = () => {
  const animationsRef = useRef<AnimationTimeline[]>([]);

  const registerAnimation = (animation: AnimationTimeline) => {
    animationsRef.current.push(animation);
  };

  const killAllAnimations = () => {
    animationsRef.current.forEach((anim) => anim.kill());
    animationsRef.current = [];
  };

  useEffect(() => {
    return () => {
      killAllAnimations();
    };
  }, []);

  return { registerAnimation, killAllAnimations };
};
