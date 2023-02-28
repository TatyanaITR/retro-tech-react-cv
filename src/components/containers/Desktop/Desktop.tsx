import React, { useContext } from "react";
import Window from "../../simple/Window/Window";
import styles from "./Desktop.module.css";
import Icon from "../../simple/Icon/Icon";
import Navigation from "../../simple/Navigation/Navigation";
import { DesktopContext } from "./Desktop.context";
import { appSettings } from "../../../core/config/variables";
import MinimizedWindowsBar from "../MinimizedWindowsBar/MinimizedWindowsBar";

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
        <MinimizedWindowsBar
          minimizedWindows={store.minimizedWindows}
          handleRestoreWindow={handleRestoreWindow}
        />
      </div>
    </>
  );
};
