import React, { useEffect, useState } from "react";
import styles from "./Desktop.module.css";
import {
  AppDispatch,
  RootState,
  store,
  useStoreDispatch,
} from "../../../core/store/store";
import { useSelector } from "react-redux";
import { getFolder, setRootFolder } from "../../../core/store/files";
import DraggableIcon from "../../simple/Icons/DraggableIcon/DraggableIcon";
import { appSettings } from "../../../core/config/variables";
import { Coords, Size } from "../../../core/types/commonTypes";
import Window from "../../simple/Window/Window";
import { deactivateWindows, openWindow } from "../../../core/store/windows";
import { InnerResourcesView } from "../InnerResourcesView/InnerResourcesView";
import MinimizedWindowsBar from "../MinimizedWindowsBar/MinimizedWindowsBar";

export const Desktop: React.FC = () => {
  const [lastCoords, setLastCoords] = useState(appSettings.initialCoords);
  const dispatch = useStoreDispatch();
  const rootFolder = useSelector((state: RootState) => state.files.rootFolder);
  const currentFolder = useSelector(
    (state: RootState) => state.files.currentFolder
  );
  const isLoading = useSelector((state: RootState) => state.files.isLoading);
  const windowsState = useSelector((state: RootState) => state.windows);
  const activeWindowId = useSelector(
    (state: RootState) => state.windows.activeWindowId
  );

  const setRoot = (id: string) => async (dispatch: AppDispatch) => {
    const curFolder = await dispatch(getFolder(id));
    dispatch(setRootFolder(curFolder.payload));
  };

  useEffect(() => {
    dispatch(setRoot(import.meta.env.VITE_ROOT_ID));
  }, []);

  const handleDocumentClick = (event: MouseEvent) => {
    const clickedInsideWindow = (event.target as Element).closest(".window");
    const clickedInsideActiveWindow = (event.target as Element).closest(
      `.window-active`
    );
    if (!clickedInsideWindow && !clickedInsideActiveWindow) {
      dispatch(deactivateWindows());
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [activeWindowId]);
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.desktop} id="desktop">
          {rootFolder.children && (
            <InnerResourcesView
              childNodes={rootFolder.children}
              gridDirection="columns"
            />
          )}
          {windowsState.openWindows.map((window) => (
            <Window
              key={window.id}
              id={window.id}
              title={window.title}
              type="folder"
              coords={window.coords}
              childNodes={window.childNodes}
            />
          ))}
          <MinimizedWindowsBar
            minimizedWindows={windowsState.minimizedWindows}
          />
        </div>
      )}
    </>
  );
};
