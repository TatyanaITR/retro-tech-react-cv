import React, { useEffect } from "react";
import styles from "./Desktop.module.css";
import { RootState, useStoreDispatch } from "../../../core/store/store";
import { useSelector } from "react-redux";
import { getRawData } from "../../../core/store/files";
import Window from "../../simple/Window/Window";
import { deactivateWindows } from "../../../core/store/windows";
import { InnerResourcesView } from "../InnerResourcesView/InnerResourcesView";
import MinimizedWindowsBar from "../MinimizedWindowsBar/MinimizedWindowsBar";

export const Desktop: React.FC = () => {
  const dispatch = useStoreDispatch();
  const foldersTree = useSelector(
    (state: RootState) => state.files.foldersTree
  );
  const isLoading = useSelector((state: RootState) => state.files.isLoading);
  const windowsState = useSelector((state: RootState) => state.windows);
  const activeWindowId = useSelector(
    (state: RootState) => state.windows.activeWindowId
  );

  useEffect(() => {
    dispatch(getRawData());
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
          {foldersTree && (
            <InnerResourcesView
              childNodes={foldersTree[0]}
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
