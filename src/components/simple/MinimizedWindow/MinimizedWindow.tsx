import React from "react";
import styles from "./MinimizedWindow.module.css";
import { IBaseWindow } from "../Window/Window";
import { useStoreDispatch } from "../../../core/store/store";
import {
  closeWindow,
  minimizeWindow,
  restoreWindow,
} from "../../../core/store/windows";

const MinimizedWindow: React.FC<IBaseWindow> = ({ id, title }: IBaseWindow) => {
  const dispatch = useStoreDispatch();

  const handleCloseWindow = (id: string) => {
    dispatch(closeWindow(id));
  };
  const handleRestoreWindow = (id: string) => {
    dispatch(restoreWindow(id));
  };
  const windowId: string = `window-${id}`;
  const windowClass: string = `window ${styles["window-minimized"]}`;
  return (
    <div className={windowClass} id={windowId}>
      <div className={styles.headerWrapper}>
        <div
          className={styles.headerText}
          onClick={() => handleRestoreWindow(id)}
        >
          {title}
        </div>
        <div className={styles.windowControls}>
          <button onClick={() => handleCloseWindow(id)}>X</button>
        </div>
      </div>
    </div>
  );
};

export default MinimizedWindow;
