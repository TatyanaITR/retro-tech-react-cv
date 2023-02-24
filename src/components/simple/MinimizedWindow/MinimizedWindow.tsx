import React from "react";
import styles from "./MinimizedWindow.module.css";
import { IWindow } from "../Window/Window";

export interface IMinimizedWindow
  extends Pick<IWindow, "id" | "header" | "onClose" > {
  onRestore: (id: number) => void;
}

const MinimizedWindow: React.FC<IMinimizedWindow> = ({
  id,
  header,
  onClose,
  onRestore,
}: IMinimizedWindow) => {
  const windowId: string = `window-${id}`;
  const windowClass: string = `window ${styles["window-minimized"]}`;

  return (
    <div className={windowClass} id={windowId}>
      <div className={styles.headerWrapper} onClick={() => onRestore(id)}>
        <div className={styles.headerText}>{header}</div>
        <div className={styles.windowControls}>
          <button onClick={() => onClose(id)}>X</button>
        </div>
      </div>
      <div className={styles.windowContent}>
        This is the content of window {id}.
      </div>
    </div>
  );
};

export default MinimizedWindow;
