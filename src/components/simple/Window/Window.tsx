import React from "react";
import styles from "./Window.module.css";
import DraggableElement from "../../containers/DraggableElement/DraggableElement";
import { Coords, Size } from "../../../core/types/commonTypes";

export interface IWindow {
  id: number;
  coords: Coords;
  size?: Size;
  header: string;
  buttons: string[];
  onClose: (id: number) => void;
  onMinimize: (id: number) => void;
}

const Window: React.FC<IWindow> = ({
  id,
  coords,
  size = { w: 400, h: 300 },
  header,
  buttons,
  onClose,
  onMinimize,
}: IWindow) => {
  const handleButtonClick = (button: string) => {
    switch (button) {
      case "close":
        onClose(id);
        break;
      case "minimize":
        onMinimize(id);
        break;
      default:
        break;
    }
  };
  const windowId: string = `window-${id}`;
  return (
    <DraggableElement
      className={`${styles.window}`}
      id={windowId}
      handleSelector={`.${styles.headerWrapper}`}
      style={{
        width: size.w,
        height: size.h,
        left: coords.x,
        top: coords.y,
      }}
    >
      <div className={styles.headerWrapper}>
        <div className={styles.headerText}>{header}</div>
        <div className={styles.windowControls}>
          {buttons.includes("close") && (
            <button onClick={() => handleButtonClick("close")}>X</button>
          )}
          {buttons.includes("minimize") && (
            <button onClick={() => handleButtonClick("minimize")}>-</button>
          )}
        </div>
      </div>
      <div className={styles.windowContent}>
        This is the content of window {id}.
      </div>
    </DraggableElement>
  );
};

export default Window;
