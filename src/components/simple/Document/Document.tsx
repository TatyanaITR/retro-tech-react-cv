import React from "react";

export interface IDocumentContent {
  id: string;
}

export const Folder: React.FC<IDocumentContent> = ({ id }) => {
  return (
    <>
      <p>Я документ с id = "{id}"</p>
    </>
  );
};
