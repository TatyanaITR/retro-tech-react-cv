import React from "react";

export interface IFolderContent {
  id: string;
}

export const FolderContent: React.FC<IFolderContent> = ({ id }) => {
  return (
    <>
      <p>Я папка с id = "{id}"</p>
    </>
  );
};
