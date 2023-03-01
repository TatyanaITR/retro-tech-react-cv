import React, { CSSProperties } from "react";
import { useDragger } from "../../../core/hooks/useDragger";
import cn from "classnames";
import styles from "./DraggableElement.module.css";
export type DraggableElementProps = {
  id: string;
  className?: string;
  handleSelector?: string;
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
  const cls = cn(className, styles["draggable-element"]);
  useDragger(id, handleSelector);
  return (
    <div id={id} className={cls} style={style}>
      {children}
    </div>
  );
}
export default DraggableElement;
