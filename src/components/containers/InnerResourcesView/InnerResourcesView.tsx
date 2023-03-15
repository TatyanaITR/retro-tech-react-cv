import React from "react";
import {
  Folder,
  Document,
  Label,
  DocType,
} from "../../../core/api/files.types";
import DraggableIcon from "../../simple/Icons/DraggableIcon/DraggableIcon";
//import { getFolder } from "../../../core/store/files";
import { RootState, store, useStoreDispatch } from "../../../core/store/store";
import { openWindow } from "../../../core/store/windows";
import { Coords } from "../../../core/types/commonTypes";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import GridContainer from "../GridContainer/GridContainer";
import { Item } from "./InnerResourcesView.types";

interface IInnerResourcesView {
  childNodes?: {
    subfolders?: Folder[];
    documents?: Document[];
    labels?: Label[];
  };
  gridDirection?: "rows" | "columns";
}

export const InnerResourcesView: React.FC<IInnerResourcesView> = ({
  childNodes,
  gridDirection = "rows",
}) => {
  //const [lastCoords, setLastCoords] = useState(appSettings.initialCoords);
  const dispatch = useStoreDispatch();
  const currentFolder = useSelector(
    (state: RootState) => state.files.currentFolder
  );
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
          //await dispatch(getFolder(id));
        }
        /*Here I directly get the state, because for some unknown reason
        it is in this place that the value in the currentFolder selector
        is cached, and this rake was substituted here
        after many hours of struggle.*/
        const state = store.getState();
        const curFolder = state.files.currentFolder;
        dispatch(
          openWindow({
            id: curFolder.folder.id,
            title: curFolder.folder.title,
            type: "folder",
            childNodes: curFolder.children,
            coords: { x: 30, y: 50 },
          })
        );
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
    children: {
      subfolders?: Folder[];
      documents?: Document[];
      labels?: Label[];
    },
    lastCoords: Coords
  ) => {
    return {
      id,
      title,
      lastCoords,
      children,
    };
  };
  const renderDraggableIcons = (items: Item[]) => {
    return items.map(({ id, title, icon_name, type, linkType }) => (
      <DraggableIcon
        key={id}
        id={id}
        size="lg"
        type={type}
        label={title}
        iconName={icon_name ?? undefined}
        linkType={type === DocType.Label ? linkType : undefined}
        handleIconDoubleClick={handleIconDoubleClick}
      />
    ));
  };

  const { subfolders, documents, labels } = childNodes ?? {};
  return (
    <>
      <GridContainer direction={gridDirection}>
        {subfolders && renderDraggableIcons(subfolders as Item[])}
        {documents && renderDraggableIcons(documents as Item[])}
        {labels && renderDraggableIcons(labels as Item[])}
      </GridContainer>
    </>
  );
};
