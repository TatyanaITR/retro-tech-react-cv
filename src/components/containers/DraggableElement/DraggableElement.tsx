import React, { CSSProperties } from "react";
import { useDragger } from "../../../core/hooks/useDragger";
type DraggableElementProps = {
  id: string;
  className?: string;
  handleSelector: string;
  style?: CSSProperties;
  children?: React.ReactNode;
};

function DraggableElement({
  id,
  children,
  style,
  className,
  handleSelector,
}: DraggableElementProps) {
  useDragger(id, handleSelector);
  return (
    <div id={id} className={className} style={style}>
      {" "}
      {children}{" "}
    </div>
  );
}
export default DraggableElement;
