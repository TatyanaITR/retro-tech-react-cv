import React from "react";
import cn from "classnames";
import styles from "./Window.module.css";
import DraggableElement from "../../containers/DraggableElement/DraggableElement";
import { Coords, Size } from "../../../core/types/commonTypes";
import { Content } from "../../containers/Desktop/Desktop.types";
import { setWindowContentType } from "./Window.helpers";

export interface IWindow {
  id: string;
  coords: Coords;
  size?: Size;
  header: string;
  content: Content[] | [];
  windowtypes?: string;
  buttons?: string[];
  isActive?: boolean;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMouseDown: (id: string) => void;
}

const Window: React.FC<IWindow> = ({
  id,
  coords,
  size = { w: 400, h: 300 },
  header,
  content,
  windowtypes = "default",
  buttons,
  isActive = false,
  onClose,
  onMinimize,
  onMouseDown,
}: IWindow) => {
  const allButtons = buttons?.length ? buttons : ["minimize", "close"];
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
  const windowContent = setWindowContentType(windowtypes, content);
  const windowId: string = `window-${id}`;
  const windowCls = cn(styles.window, {
    [styles["window-active"]]: isActive,
  });
  return (
    <DraggableElement
      className={windowCls}
      id={windowId}
      handleSelector={`.${styles.headerWrapper}`}
      style={{
        width: size.w,
        height: size.h,
        left: coords.x,
        top: coords.y,
      }}
    >
      <div onMouseDown={() => onMouseDown(id)}>
        <div className={styles.headerWrapper}>
          <div className={styles.headerText}>{header}</div>
          <div className={styles.windowControls}>
            {allButtons.includes("minimize") && (
              <button onClick={() => handleButtonClick("minimize")}>-</button>
            )}
            {allButtons.includes("close") && (
              <button onClick={() => handleButtonClick("close")}>X</button>
            )}
          </div>
        </div>
        <div className={styles.windowContent}>{windowContent}</div>
      </div>
    </DraggableElement>
  );
};

export default Window;
