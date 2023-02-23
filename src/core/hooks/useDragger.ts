import { useEffect, useRef } from "react";

export function useDragger(id: string, handleSelector: string) {
  const isClicked = useRef<boolean>(false);
  const coords = useRef<{
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
  }>({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
  });

  useEffect(() => {
    const target = document.getElementById(id);
    if (!target) throw new Error("Element with given ID doesn't exist");

    const container = target.parentElement;
    if (!container) throw new Error("Target element must have a parent");

    const containerRect = container.getBoundingClientRect();
    const handle = target.querySelector(handleSelector) as HTMLElement;
    if (!handle)
      throw new Error("Element with given handle selector doesn't exist");

    const handleRect = handle.getBoundingClientRect();

    const onMouseDown = (e: MouseEvent) => {
      if (e.target === handle) {
        isClicked.current = true;
        coords.current.startX = e.clientX;
        coords.current.startY = e.clientY;
      }
    };

    const onMouseUp = () => {
      isClicked.current = false;
      coords.current.lastX = target.offsetLeft;
      coords.current.lastY = target.offsetTop;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isClicked.current) return;

      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;

      const targetRect = target.getBoundingClientRect();

      if (
        nextX >= containerRect.left &&
        nextX <= containerRect.right - targetRect.width
      ) {
        target.style.left = `${nextX}px`;
      }

      if (
        nextY >= containerRect.top + handleRect.height &&
        nextY <= containerRect.bottom - targetRect.height
      ) {
        target.style.top = `${nextY}px`;
      }
    };

    container.addEventListener("mousedown", onMouseDown as EventListener);
    container.addEventListener("mouseup", onMouseUp as EventListener);
    container.addEventListener("mousemove", onMouseMove as EventListener);

    return () => {
      container.removeEventListener("mousedown", onMouseDown as EventListener);
      container.removeEventListener("mouseup", onMouseUp as EventListener);
      container.removeEventListener("mousemove", onMouseMove as EventListener);
    };
  }, [id, handleSelector]);
}
