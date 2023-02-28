import styles from "./MinimizedWindowsBar.module.css";
import MinimizedWindow from "../../simple/MinimizedWindow/MinimizedWindow";
import React from "react";
import { IWindow } from "../../simple/Window/Window";
import cn from "classnames";

export interface IMinimizedWindowsBar {
  minimizedWindows: IWindow[];
  handleRestoreWindow: (id: string) => void;
}

const MinimizedWindowsBar: React.FC<IMinimizedWindowsBar> = ({
  minimizedWindows,
  handleRestoreWindow,
}) => {
  const isEmpty = !minimizedWindows.length;
  const barCls = cn(styles.minimizedWindowsBar, {
    [styles["minimizedWindowsBar-empty"]]: isEmpty,
  });
  return (
    <div id="minimizedWindowsBar" className={barCls}>
      {minimizedWindows.map((window) => (
        <MinimizedWindow
          key={window.id}
          {...window}
          onRestore={handleRestoreWindow}
        />
      ))}
    </div>
  );
};

export default MinimizedWindowsBar;
