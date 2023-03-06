import React from "react";

export interface IDocumentContent {
  id: string;
}

export const DocumentContent: React.FC<IDocumentContent> = ({ id }) => {
  return (
    <>
      <p>Я документ с id = "{id}"</p>
    </>
  );
};
