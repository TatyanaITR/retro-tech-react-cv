import React, { useState } from "react";
import {
  Folder,
  Document,
  IFullFolder,
  Shortcut,
  ShortcutType,
  DocType,
} from "../../../core/api/files.types";
import DraggableIcon from "../../simple/Icons/DraggableIcon/DraggableIcon";
import { getFolder } from "../../../core/store/files";
import { RootState, store, useStoreDispatch } from "../../../core/store/store";
import { openWindow } from "../../../core/store/windows";
import { Coords } from "../../../core/types/commonTypes";
import { appSettings } from "../../../core/config/variables";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { defaultIcons } from "../../simple/Icons/DraggableIcon/DraggableIcon.helpers";
import GridContainer from "../GridContainer/GridContainer";
import {Item} from "./InnerResourcesView.types";

interface IInnerResourcesView {
  folder: IFullFolder;
  gridDirection?: "rows" | "columns";
}

export const InnerResourcesView: React.FC<IInnerResourcesView> = ({
  folder,
  gridDirection = "rows",
}) => {
  //const [lastCoords, setLastCoords] = useState(appSettings.initialCoords);
  const dispatch = useStoreDispatch();
  const rootFolder = useSelector((state: RootState) => state.files.rootFolder);
  const currentFolder = useSelector(
    (state: RootState) => state.files.currentFolder
  );
  const isLoading = useSelector((state: RootState) => state.files.isLoading);
  const windowsState = useSelector((state: RootState) => state.windows);

  const handleIconDoubleClick = (id: string, type: string) => {
    const isRoot = windowsState.openWindows.length === 0;
    if (isRoot || type === "document") {
      handleOpenWindow(id, type);
    }
  };
  const handleOpenWindow = async (id: string, type: string) => {
    switch (type) {
      case "folder":
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
        break;
      case "document":
        break;
      case "default":
        toast.error("Can't load desktop. Please refresh page", {});
    }
  };
  const createFolderWindow = (
    id: string,
    title: string,
    lastCoords: Coords
  ) => {
    return {
      id,
      title,
      lastCoords,
    };
  };
  const renderDraggableIcons = (items: Item[]) => {
    return items.map(({ id, title, icon_name, type, linktype }) => (
      <DraggableIcon
        key={id}
        id={id}
        size="lg"
        type={type}
        label={title}
        iconName={icon_name ?? undefined}
        linkType={type === DocType.Shortcut ? linktype : undefined}
        handleIconDoubleClick={handleIconDoubleClick}
      />
    ));
  };

  const { subfolders, documents, shortcuts } = folder.children ?? {};
  return (
    <>
      <GridContainer direction={gridDirection}>
        {subfolders && renderDraggableIcons(subfolders as Item[])}
        {documents && renderDraggableIcons(documents as Item[])}
        {shortcuts && renderDraggableIcons(shortcuts as Item[])}
      </GridContainer>
    </>
  );
};
