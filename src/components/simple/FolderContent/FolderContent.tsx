import React from "react";
import { Document, Folder, Label } from "../../../core/api/files.types";
import { InnerResourcesView } from "../../containers/InnerResourcesView/InnerResourcesView";

export interface IFolderContent {
  childNodes?: {
    subfolders?: Folder[];
    documents?: Document[];
    labels?: Label[];
  };
}

export const FolderContent: React.FC<IFolderContent> = ({ childNodes }) => {
  if (childNodes) {
    return <InnerResourcesView childNodes={childNodes} />;
  } else {
    return <p>empty folder</p>;
  }
};
