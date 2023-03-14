import React from "react";
import DraggableElement from "../../containers/DraggableElement/DraggableElement";
import { FolderContent } from "../FolderContent/FolderContent";
import { DocumentContent } from "../DocumentContent/DocumentContent";
import cn from "classnames";
import styles from "./Window.module.css";
import { Coords, Size } from "../../../core/types/commonTypes";
import { appSettings } from "../../../core/config/variables";
import { RootState, useStoreDispatch } from "../../../core/store/store";
import {
  activateWindow,
  closeWindow,
  minimizeWindow,
} from "../../../core/store/windows";
import { Document, Folder, Label } from "../../../core/api/files.types";
import { useSelector } from "react-redux";

export interface IBaseWindow {
  id: string;
  coords: Coords;
  title: string;
  type: "folder" | "document";
  size?: Size;
  buttons?: string[];
  isActive?: boolean;
  iconName?: string;
  childNodes?: {
    subfolders?: Folder[];
    documents?: Document[];
    labels?: Label[];
  };
}

const Window: React.FC<IBaseWindow> = ({
  id,
  childNodes,
  coords,
  size = {
    w: appSettings.defaultWindowSize.w,
    h: appSettings.defaultWindowSize.h,
  },
  title,
  type,
  buttons,
  isActive = false,
}: IBaseWindow) => {
  const dispatch = useStoreDispatch();
  const isActiveSelector = useSelector(
    (state: RootState) =>
      state.windows.openWindows.find((window) => window.id === id)?.isActive ??
      false
  );
  const handleCloseWindow = (id: string) => {
    dispatch(closeWindow(id));
  };
  const handleMinimizeWindow = (id: string) => {
    dispatch(minimizeWindow(id));
  };
  const handleMouseDownWindow = (id: string) => {
    dispatch(activateWindow(id));
  };

  const allButtons = buttons?.length ? buttons : ["minimize", "close"];
  const handleButtonClick = (button: string) => {
    switch (button) {
      case "close":
        handleCloseWindow(id);
        break;
      case "minimize":
        handleMinimizeWindow(id);
        break;
      default:
        break;
    }
  };
  const windowCls = cn(styles.window, {
    window,
    [styles["window-active"]]: isActiveSelector,
  });
  const contentType: React.ReactNode = (() => {
    switch (type) {
      case "folder": {
        return <FolderContent childNodes={childNodes} />;
      }
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
        onMouseDown={() => handleMouseDownWindow(id)}
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
