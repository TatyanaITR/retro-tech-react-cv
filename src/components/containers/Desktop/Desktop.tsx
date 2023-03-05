import React, { useEffect } from "react";
import styles from "./Desktop.module.css";
import {
  AppDispatch,
  RootState,
  useStoreDispatch,
} from "../../../core/store/store";
import { useSelector } from "react-redux";
import { getFolder, setRootFolder } from "../../../core/store/files";

export const Desktop: React.FC = () => {
  const dispatch = useStoreDispatch();
  const rootFolder = useSelector((state: RootState) => state.files.rootFolder);
  const currentFolder = useSelector(
    (state: RootState) => state.files.currentFolder
  );

  const setRoot = (id: string) => async (dispatch: AppDispatch) => {
    const currentFolder = await dispatch(getFolder(id));
    dispatch(setRootFolder(currentFolder.payload));
  };

  useEffect(() => {
    dispatch(setRoot(import.meta.env.VITE_ROOT_ID));
  }, []);

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
