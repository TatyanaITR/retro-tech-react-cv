import React, { useRef } from "react";
import useGrid from "../../../core/hooks/useGrid";
import styles from "./GridContainer.module.css";

export interface IGridContainer {
  direction?: "rows" | "columns";
  gap?: number;
  children: React.ReactNode;
}

export const GridContainer = ({
                         direction = "columns",
                         gap = 20,
                         children,
                       }: IGridContainer) => {
  if (!children) return null;

  const containerRef = useRef<HTMLDivElement>(null);
  useGrid({ containerRef, direction, gap });

  return (
      <div ref={containerRef} className={styles.container}>
        {children}
      </div>
  );
};

export default GridContainer;
