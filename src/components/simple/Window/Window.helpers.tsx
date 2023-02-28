import React from "react";
import {
  Content,
  WindowsDataElement,
} from "../../containers/Desktop/Desktop.types";
import FeedbackForm from "../FeedbackForm/FeedbackForm";
import { WindowDefaultContentType } from "./ContentTypes/WindowDefaultContentType";
import Navigation from "../Navigation/Navigation";

export const setWindowContentType = (
  type: string,
  content: Content[] | [] | WindowsDataElement[]
): React.ReactNode => {
  switch (type) {
    case "default":
      return <WindowDefaultContentType content={content} />;
    case "feedback":
      return <FeedbackForm />;
    case "navigation":
      return <Navigation />;
    default:
      return <div>Empty window, sorry :(</div>;
  }
};
