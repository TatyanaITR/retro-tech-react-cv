import React, { useEffect, useState } from "react";
import {
  Folder,
  Document,
  Label,
  DocType,
  ITree,
} from "../../../core/api/files.types";
import DraggableIcon from "../../simple/Icons/DraggableIcon/DraggableIcon";
import { RootState, useStoreDispatch } from "../../../core/store/store";
import { openWindow } from "../../../core/store/windows";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import GridContainer from "../GridContainer/GridContainer";
import { getFolder } from "../../../core/store/files";

interface IInnerResourcesView {
  childNodes?: ITree[];
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

  const [folderToOpen, setFolderToOpen] = useState<string | null>(null);

  useEffect(() => {
    if (currentFolder && folderToOpen) {
      console.log(currentFolder.children);
      dispatch(
        openWindow({
          id: currentFolder.item.id,
          title: currentFolder.item.title,
          type: "folder",
          childNodes: currentFolder.children || [],
          coords: { x: 30, y: 50 },
        })
      );
      setFolderToOpen(null); // сбросить состояние folderToOpen
    }
  }, [currentFolder, dispatch, folderToOpen]);

  const handleIconDoubleClick = (id: string, type: string) => {
    const isRoot = windowsState.openWindows.length === 0;
    if (isRoot || type === "document") {
      handleOpenWindow(id, type);
    }
  };
  const handleOpenWindow = (id: string, type: string) => {
    switch (type) {
      case "folder":
        dispatch(getFolder(id));
        setFolderToOpen(id);
        break;
      case "document":
        break;
      case "default":
        toast.error("Can't load desktop. Please refresh page", {});
    }
  };
  /*  const createFolderWindow = (
    id: string,
    title: string,
    children: {
      folders?: Folder[];
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
  };*/
  type MergedItem = Folder | Document | Label;

  function isLabel(item: MergedItem): item is Label {
    return item.type === DocType.Label;
  }

  const renderDraggableIcons = (items: ITree[]) => {
    return items.map((node) => {
      const item = node.item;
      return (
        <DraggableIcon
          key={item.id}
          id={item.id}
          size="lg"
          type={item.type}
          label={item.title}
          iconName={item.icon_name ?? undefined}
          linkType={isLabel(item) ? item.link_type : undefined}
          handleIconDoubleClick={handleIconDoubleClick}
        />
      );
    });
  };

  return (
    <>
      {childNodes && (
        <GridContainer direction={gridDirection}>
          {renderDraggableIcons(childNodes)}
        </GridContainer>
      )}
    </>
  );
};
