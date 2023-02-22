import React from "react";
import styles from "./Window.module.css";

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

  return (
    <div className={styles.window} style={{ left: x, top: y }}>
      <div className="title-bar">
        <div className="title">{header}</div>
        <div className="buttons">
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
      <div className="content">This is the content of window {id}.</div>
    </div>
  );
};

export default Window;
