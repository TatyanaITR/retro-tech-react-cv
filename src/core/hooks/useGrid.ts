import React, { useEffect } from "react";

interface IGrid {
  containerRef: React.RefObject<HTMLElement>;
  direction: string;
  gap: number;
}
function useGrid({ containerRef, direction, gap }: IGrid): void {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const items = Array.from(container.children) as HTMLElement[];

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const itemWidth = (items[0] as HTMLElement).offsetWidth;
    const itemHeight = (items[0] as HTMLElement).offsetHeight;

    let colCount = Math.floor(containerWidth / (itemWidth + gap - gap));
    let rowCount = Math.floor(containerHeight / (itemHeight + gap - gap));
    if (colCount < 1) {
      colCount = 1;
    }
    if (rowCount < 1) {
      rowCount = 1;
    }

    let col = 0;
    let row = 0;

    items.forEach((item) => {
      item.style.left = `${col * (itemWidth + gap)}px`;
      item.style.top = `${row * (itemHeight + gap)}px`;

      if (direction === "rows") {
        col++;
        if (col >= colCount) {
          col = 0;
          row++;
        }
      } else if (direction === "columns") {
        row++;
        if (row >= rowCount) {
          row = 0;
          col++;
        }
      }
    });
  }, []);
}

export default useGrid;
