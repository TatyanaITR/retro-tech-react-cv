import React, { useContext, useEffect } from "react";
import Window from "../../simple/Window/Window";
import styles from "./Desktop.module.css";
import Navigation from "../../simple/Navigation/Navigation";
import { appSettings } from "../../../core/config/variables";
import MinimizedWindowsBar from "../MinimizedWindowsBar/MinimizedWindowsBar";
import DraggableIcon from "../../simple/Icons/DraggableIcon/DraggableIcon";
import { RootState, useStoreDispatch } from "../../../core/store/store";
import { useSelector } from "react-redux";
import { getDesktop } from "../../../core/store/files";

export const Desktop: React.FC = () => {
  const dispatch = useStoreDispatch();
  const rootFolder = useSelector((state: RootState) => state.files.rootFolder);
  useEffect(() => {
    dispatch(getDesktop());
  }, [dispatch]);
  return (
    <>
      <div className={styles.desktop} id="desktop">
        {/* <DraggableIcon
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
        />*/}
      </div>
    </>
  );
};
