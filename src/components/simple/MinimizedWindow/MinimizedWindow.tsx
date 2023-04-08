import React from "react";
import styles from "./MinimizedWindow.module.css";
import { IBaseWindow } from "../Window/Window";
import { useStoreDispatch } from "../../../core/store/store";
import {
  closeWindow,
  restoreWindow,
} from "../../../core/store/windows";

const MinimizedWindow: React.FC<IBaseWindow> = ({ generatedId, title }: IBaseWindow) => {
  const dispatch = useStoreDispatch();

  const handleCloseWindow = (id: string) => {
    dispatch(closeWindow(id));
  };
  const handleRestoreWindow = (id: string) => {
    dispatch(restoreWindow(id));
  };
  const windowId: string = `window-${generatedId}`;
  const windowClass: string = `window ${styles["window-minimized"]}`;
  return (
    <div className={windowClass} id={windowId}>
      <div className={styles.headerWrapper}>
        <div
          className={styles.headerText}
          onClick={() => handleRestoreWindow(generatedId)}
        >
          {title}
        </div>
        <div className={styles.windowControls}>
          <button onClick={() => handleCloseWindow(generatedId)}>X</button>
        </div>
      </div>
    </div>
  );
};

export default MinimizedWindow;
