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
import { openWindow } from "../../../core/store/windows";

export const Desktop: React.FC = () => {
  const [lastCoords, setLastCoords] = useState(appSettings.initialCoords);
  const dispatch = useStoreDispatch();
  const rootFolder = useSelector((state: RootState) => state.files.rootFolder);
  const currentFolder = useSelector(
    (state: RootState) => state.files.currentFolder
  );
  const isLoading = useSelector((state: RootState) => state.files.isLoading);
  const windowsState = useSelector((state: RootState) => state.windows);

  const setRoot = (id: string) => async (dispatch: AppDispatch) => {
    const curFolder = await dispatch(getFolder(id));
    dispatch(setRootFolder(curFolder.payload));
  };

  useEffect(() => {
    dispatch(setRoot(import.meta.env.VITE_ROOT_ID));
  }, []);
  /*  useEffect(() => {
    console.log("currentFolder изменился");
    console.log(currentFolder);
  }, [currentFolder]);*/

  const handleIconDoubleClick = (id: string, type: string) => {
    const isRoot = windowsState.openWindows.length === 0;
    if (isRoot || type === "document") {
      handleOpenWindow(id, type);
    }
  };
  const handleOpenWindow = async (id: string, type: string) => {
    if (type === "folder") {
      if (id != currentFolder.folder.id) {
        await dispatch(getFolder(id));
      }
      /*Here I directly get the state, because for some unknown reason
      it is in this place that the value in the currentFolder selector
      is cached, and this rake was substituted here
      after many hours of struggle.*/
      const state = store.getState();
      const curFolder = state.files.currentFolder;
      let newWindow = createFolderWindow(
        curFolder.folder.id,
        curFolder.folder.title,
        { x: 30, y: 50 }
        //handleIconDoubleClick
      );
      dispatch(openWindow(newWindow));
    }
  };
  const createFolderWindow = (
    id: string,
    title: string,
    lastCoords: Coords
    //handleIconDoubleClick: (id: string, type: string) => void
  ) => {
    return {
      id,
      title,
      lastCoords,
      //handleIconDoubleClick,
    };
  };
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.desktop} id="desktop">
          {rootFolder.subfolders &&
            rootFolder.subfolders.map(({ id, title, icon_name, type }) => {
              return (
                <DraggableIcon
                  key={id}
                  id={id}
                  size="lg"
                  type={type}
                  label={title}
                  iconName={icon_name ? icon_name : "folder-icon"}
                  handleIconDoubleClick={handleIconDoubleClick}
                />
              );
            })}
          {windowsState.openWindows.map((window) => (
            <Window
              key={window.id}
              id={window.id}
              title={window.title}
              type="folder"
              coords={window.coords}
              //handleIconDoubleClick={handleIconDoubleClick}
            />
          ))}
        </div>
      )}
    </>
  );
};
