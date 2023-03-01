import React, { useContext } from "react";
import Window from "../../simple/Window/Window";
import styles from "./Desktop.module.css";
import Navigation from "../../simple/Navigation/Navigation";
import { DesktopContext } from "./Desktop.context";
import { appSettings } from "../../../core/config/variables";
import MinimizedWindowsBar from "../MinimizedWindowsBar/MinimizedWindowsBar";
import DraggableIcon from "../../simple/Icons/DraggableIcon/DraggableIcon";

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
        <DraggableIcon
          size="lg"
          label="DoubleClick Me!"
          iconName="navigation"
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
