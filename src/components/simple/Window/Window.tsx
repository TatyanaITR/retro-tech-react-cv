import React from "react";
import cn from "classnames";
import styles from "./Window.module.css";
import DraggableElement from "../../containers/DraggableElement/DraggableElement";
import { Coords, Size } from "../../../core/types/commonTypes";
import { Content } from "../../containers/Desktop/Desktop.types";
import { setWindowContentType } from "./Window.helpers";
import { appSettings } from "../../../core/config/variables";

export interface IBaseWindow {
  id: string;
  coords: Coords;
  size?: Size;
  header: string;
  buttons?: string[];
  isActive?: boolean;
  iconName?: string;
  children: React.ReactNode | React.ReactNode[];
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMouseDown: (id: string) => void;
  onRestore: (id: string) => void;
}

const Window: React.FC<IBaseWindow> = ({
  id,
  coords,
  size = {
    w: appSettings.defaultWindowSize.w,
    h: appSettings.defaultWindowSize.h,
  },
  header,
  buttons,
  isActive = false,
  children,
  onClose,
  onMinimize,
  onMouseDown,
}: IBaseWindow) => {
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
  //const windowContent = setWindowContentType(windowtypes, content);
  const windowCls = cn(styles.window, {
    [styles["window-active"]]: isActive,
  });
  return (
    <DraggableElement
      className={windowCls}
      id={`window-${id}`}
      handleSelector={`.${styles["window-header"]}`}
      style={{
        width: size.w,
        height: size.h,
        left: coords.x,
        top: coords.y,
      }}
    >
      <div
        className={styles["window-wrapper"]}
        onMouseDown={() => onMouseDown(id)}
      >
        <div className={styles["window-header"]}>
          <div className={styles["header-text"]}>{header}</div>
          <div className={styles["window-controls"]}>
            {allButtons.includes("minimize") && (
              <button onClick={() => handleButtonClick("minimize")}>-</button>
            )}
            {allButtons.includes("close") && (
              <button onClick={() => handleButtonClick("close")}>X</button>
            )}
          </div>
        </div>
        <div className={styles["window-content"]}>{children}</div>
      </div>
    </DraggableElement>
  );
};

export default Window;
