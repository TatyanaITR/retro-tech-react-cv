import React from "react";
import styles from "./Window.module.css";
import DraggableElement from "../../containers/DraggableElement/DraggableElement";

export interface IWindow {
  id: number;
  x: number;
  y: number;
  header: string;
  buttons: string[];
  onClose: (id: number) => void;
  onMinimize: (id: number) => void;
  onMaximize: (id: number) => void;
  minimized?: boolean;
  maximized?: boolean;
}

const Window: React.FC<IWindow> = ({
  id,
  x,
  y,
  header,
  buttons,
  onClose,
  onMinimize,
  onMaximize,
  minimized = false,
  maximized = false,
}: IWindow) => {
  const handleButtonClick = (button: string) => {
    switch (button) {
      case "close":
        onClose(id);
        break;
      case "minimize":
        onMinimize(id);
        break;
      case "maximize":
        onMaximize(id);
        break;
      default:
        break;
    }
  };
  const windowId: string = `window-${id}`;
  const isMinimizedClass: string = minimized
    ? ` ${styles["window-minimized"]}`
    : "";
  return (
    <DraggableElement
      className={`${styles.window}${isMinimizedClass}`}
      id={windowId}
      handleSelector={`.${styles.headerWrapper}`}
      style={{
        width: "300px",
        height: "200px",
        ...(!minimized ? { left: x, top: y } : {}),
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
          {buttons.includes("maximize") && (
            <button onClick={() => handleButtonClick("maximize")}>+</button>
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
