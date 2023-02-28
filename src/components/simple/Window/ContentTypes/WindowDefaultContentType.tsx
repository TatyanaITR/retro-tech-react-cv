import React from "react";
import {
  Content,
  ContentDefault,
} from "../../../containers/Desktop/Desktop.types";
import { NavDataElement } from "../../Navigation/Navigation.types";

interface WindowDefaultContentTypeProps {
  content: Content[] | [] | NavDataElement[];
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
