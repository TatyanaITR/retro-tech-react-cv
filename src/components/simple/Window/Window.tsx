import React from "react";
import DraggableElement from "../../containers/DraggableElement/DraggableElement";
import { FolderContent } from "../FolderContent/FolderContent";
import { DocumentContent } from "../DocumentContent/DocumentContent";
import cn from "classnames";
import styles from "./Window.module.css";
import { Coords, Size } from "../../../core/types/commonTypes";
import { appSettings } from "../../../core/config/variables";
import { useStoreDispatch } from "../../../core/store/store";
import { closeWindow } from "../../../core/store/windows";

export interface IBaseWindow {
  id: string;
  coords: Coords;
  title: string;
  type: "folder" | "document";
  size?: Size;
  buttons?: string[];
  isActive?: boolean;
  iconName?: string;
  //handleIconDoubleClick: (id: string, type: string) => void;
  /*onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMouseDown: (id: string) => void;
  onRestore: (id: string) => void;*/
}

const Window: React.FC<IBaseWindow> = ({
  id,
  coords,
  size = {
    w: appSettings.defaultWindowSize.w,
    h: appSettings.defaultWindowSize.h,
  },
  title,
  type,
  buttons,
  isActive = false,
}: //handleIconDoubleClick,
/*onClose,
  onMinimize,
  onMouseDown,*/
IBaseWindow) => {
  const dispatch = useStoreDispatch();

  const handleCloseWindow = (id: string) => {
    dispatch(closeWindow(id));
  };
  /*const handleMinimizeWindow = (id: string) => {
    dispatch({ type: "MINIMIZE_WINDOW", id });
  };
  const handleMouseDownWindow = (id: string) => {
    dispatch({ type: "ACTIVATE_WINDOW", id });
  };*/

  const allButtons = buttons?.length ? buttons : ["minimize", "close"];
  const handleButtonClick = (button: string) => {
    switch (button) {
      case "close":
        handleCloseWindow(id);
        break;
      /*case "minimize":
        onMinimize(id);
        break;*/
      default:
        break;
    }
  };
  const windowCls = cn(styles.window, {
    [styles["window-active"]]: isActive,
  });
  const contentType: React.ReactNode = (() => {
    switch (type) {
      case "folder":
        return <FolderContent id={id} />;
      case "document":
        return <DocumentContent id={id} />;
      default:
        return <div>Empty window, sorry :(</div>;
    }
  })();
  return (
    <DraggableElement
      className={windowCls}
      id={`window-${id}`}
      handleSelector={`.${styles["window-header"]}`}
      style={{
        width: size.w,
        height: size.h,
        left: 20,
        top: 50 /*
        left: coords.x,
        top: coords.y,*/,
      }}
    >
      <div
        className={styles["window-wrapper"]}
        /*onMouseDown={() => onMouseDown(id)}*/
      >
        <div className={styles["window-header"]}>
          <div className={styles["header-text"]}>{title}</div>
          <div className={styles["window-controls"]}>
            {allButtons.includes("minimize") && (
              <button onClick={() => handleButtonClick("minimize")}>-</button>
            )}
            {allButtons.includes("close") && (
              <button onClick={() => handleButtonClick("close")}>X</button>
            )}
          </div>
        </div>
        <div className={styles["window-content"]}>{contentType}</div>
      </div>
    </DraggableElement>
  );
};

export default Window;
