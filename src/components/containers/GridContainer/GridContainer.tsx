import React, { useRef } from "react";
import useGrid from "../../../core/hooks/useGrid";
import styles from "./GridContainer.module.css";

export interface IGridContainer {
  direction?: "rows" | "columns";
  gap?: number;
  children: React.ReactNode;
}

const GridContainer = ({
  direction = "columns",
  gap = 20,
  children,
}: IGridContainer) => {
  const containerRef = useRef<HTMLDivElement>(null);
  if (children) {
    useGrid({ containerRef, direction, gap });
  }

  return (
    <div ref={containerRef} className={styles.container}>
      {children}
    </div>
  );
};

export default GridContainer;
