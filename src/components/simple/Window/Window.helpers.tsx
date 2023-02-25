import React from "react";
import { Content } from "../../containers/Desktop/Desktop.types";
import FeedbackForm from "../FeedbackForm/FeedbackForm";
import { WindowDefaultContentType } from "./ContentTypes/WindowDefaultContentType";

export const setWindowContentType = (
  type: string,
  content: Content[] | []
): React.ReactNode | React.ReactHTML => {
  switch (type) {
    case "default":
      return <WindowDefaultContentType content={content} />;
    case "feedback":
      return <FeedbackForm />;
    default:
      return <div>Empty window, sorry :(</div>;
  }
};
