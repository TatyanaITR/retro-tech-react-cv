import React, { useContext } from "react";
import Window from "../../simple/Window/Window";
import MinimizedWindow from "../../simple/MinimizedWindow/MinimizedWindow";
import styles from "./Desktop.module.css";
import Icon from "../../simple/Icon/Icon";
import Navigation from "../../simple/Navigation/Navigation";
import { DesktopContext } from "./Desktop.context";
import { appSettings } from "../../../core/config/variables";

export const Desktop: React.FC = () => {
  const {
    store,
    navData,
    handleCloseWindow,
    handleMinimizeWindow,
    handleRestoreWindow,
    handleMouseDownWindow,
  } = useContext(DesktopContext);
  return (
    <>
      <div className={styles.desktop} id="desktop">
        <Icon
          size="md"
          label="DoubleClickMe!"
          iconName="icon-doc"
          windowProps={{
            id: appSettings.navId,
            header: "Navigation",
            windowtypes: "navigation",
            content: navData,
          }}
        />
        {store.windows.map((window) => (
          <Window
            key={window.id}
            {...window}
            onClose={handleCloseWindow}
            onMinimize={handleMinimizeWindow}
            onMouseDown={handleMouseDownWindow}
          />
        ))}
      </div>
      <div id="minimizedWindowsBar" className={styles.minimizedWindowsBar}>
        {store.minimizedWindows.map((window) => (
          <MinimizedWindow
            key={window.id}
            {...window}
            onRestore={handleRestoreWindow}
          />
        ))}
      </div>
    </>
  );
};
