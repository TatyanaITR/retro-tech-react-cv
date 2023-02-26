import React from "react";
import styles from "./MinimizedWindow.module.css";
import { IWindow } from "../Window/Window";

export interface IMinimizedWindow
  extends Pick<IWindow, "id" | "header" | "onClose"> {
  onRestore: (id: string) => void;
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
      <div className={styles.headerWrapper}>
        <div className={styles.headerText} onClick={() => onRestore(id)}>
          {header}
        </div>
        <div className={styles.windowControls}>
          <button onClick={() => onClose(id)}>X</button>
        </div>
      </div>
    </div>
  );
};

export default MinimizedWindow;
