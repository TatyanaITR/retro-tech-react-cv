import React from "react";
import {
  Content,
  ContentDefault,
} from "../../../containers/Desktop/Desktop.types";

interface WindowDefaultContentTypeProps {
  content: Content[] | [];
}

export const WindowDefaultContentType: React.FC<
  WindowDefaultContentTypeProps
> = ({ content }) => {
  const contentItem = content[0] as ContentDefault;
  return (
    <div
      dangerouslySetInnerHTML={{ __html: contentItem.defaultcontent.html }}
    />
  );
};
