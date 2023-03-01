import React, { useRef } from "react";
import useGrid from "../../../core/hooks/useGrid";

export interface IGridContainer {
  direction?: "rows" | "columns";
  gap?: number;
  children: React.ReactNode;
  className?: string;
}

const GridContainer = ({
  direction = "columns",
  gap = 20,
  children,
  className,
}: IGridContainer) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useGrid({ containerRef, direction, gap });

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default GridContainer;
