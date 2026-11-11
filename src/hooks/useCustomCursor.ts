"use client";

import { useEffect, useRef, useCallback } from "react";

export function useCustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (cursorRef.current) {
      cursorRef.current.style.left = `${e.clientX}px`;
      cursorRef.current.style.top = `${e.clientY}px`;
    }
  }, []);

  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    document.body.appendChild(cursor);
    cursorRef.current = cursor;

    const interactiveElements = () =>
      document.querySelectorAll("a, button, .magnetic-btn, [data-cursor-hover]");

    const addHover = () => cursor.classList.add("hovering");
    const removeHover = () => cursor.classList.remove("hovering");

    const attachListeners = () => {
      interactiveElements().forEach((el) => {
        el.addEventListener("mouseenter", addHover);
        el.addEventListener("mouseleave", removeHover);
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    attachListeners();

    // Re-attach on DOM changes
    const observer = new MutationObserver(() => attachListeners());
    observer.observe(document.body, { childList: true, subtree: true });

    // Hide on touch devices
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      cursor.style.display = "none";
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
      cursor.remove();
    };
  }, [onMouseMove]);
}
