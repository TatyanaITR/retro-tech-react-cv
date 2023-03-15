import React from "react";
import {
  Folder,
  Document,
  Label,
  DocType,
  ITree,
} from "../../../core/api/files.types";
import DraggableIcon from "../../simple/Icons/DraggableIcon/DraggableIcon";
import { RootState, store, useStoreDispatch } from "../../../core/store/store";
import { openWindow } from "../../../core/store/windows";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import GridContainer from "../GridContainer/GridContainer";

interface IInnerResourcesView {
  childNodes?: ITree;
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
  const handleOpenWindow = (id: string, type: string) => {
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
            id: id,
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

  const convertITreeToMergedItems = (items: ITree[]): MergedItem[] => {
    return items.map((item) => item.item);
  };

  function isLabel(item: MergedItem): item is Label {
    return item.type === DocType.Label;
  }

  const renderDraggableIcons = (items: MergedItem[]) => {
    return items.map((item) => (
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
    ));
  };

  return (
    <>
      {childNodes && (
        <GridContainer direction={gridDirection}>
          {renderDraggableIcons(convertITreeToMergedItems(childNodes.children))}
        </GridContainer>
      )}
    </>
  );
};
