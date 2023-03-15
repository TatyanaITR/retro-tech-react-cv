import React from "react";
import { ITree} from "../../../core/api/files.types";
import { InnerResourcesView } from "../../containers/InnerResourcesView/InnerResourcesView";

export interface IFolderContent {
  childNodes?: ITree;
}

export const FolderContent: React.FC<IFolderContent> = ({ childNodes }) => {
  if (childNodes) {
    return <InnerResourcesView childNodes={childNodes} />;
  } else {
    return <p>empty folder</p>;
  }
};
