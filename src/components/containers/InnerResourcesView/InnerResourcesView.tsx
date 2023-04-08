import React from "react";
import {
  Folder,
  Document,
  Label,
  DocType,
  ITree,
} from "../../../core/api/files.types";
import DraggableIcon from "../../simple/Icons/DraggableIcon/DraggableIcon";
import { useStoreDispatch } from "../../../core/store/store";
import { openWindow } from "../../../core/store/windows";
import GridContainer from "../GridContainer/GridContainer";

interface IInnerResourcesView {
  childNodes: ITree[];
  gridDirection?: "rows" | "columns";
}

export const InnerResourcesView: React.FC<IInnerResourcesView> = ({
  childNodes,
  gridDirection = "rows",
}) => {
  //const [lastCoords, setLastCoords] = useState(appSettings.initialCoords);
  const dispatch = useStoreDispatch();

  const handleIconDoubleClick = (id: string, type: string) => {
    if (type === DocType.Folder || type === DocType.Document) {
      handleOpenWindow(id, type);
    }
  };
  const handleOpenWindow = (id: string, type: string) => {
    dispatch(
        openWindow({
          id: id,
          title: "Окно",
          type: type,
          coords: { x: 30, y: 50 },
        })
    );
  };

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
      {childNodes?.length!==0 && (
        <GridContainer direction={gridDirection}>
          {renderDraggableIcons(childNodes)}
        </GridContainer>
      )}
    </>
  );
};
