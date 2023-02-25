import { Size } from "../../../core/types/commonTypes";

interface ContentDefault {
  defaultcontent: {
    html: string;
  };
}

interface ContentJobsListItem {
  id: string;
  jobtitle: string;
}
export type Content = ContentDefault | ContentJobsListItem;

export type WindowsDataElement = {
  id: string;
  header: string;
  buttons: string[];
  size?: Size;
  type: string;
  content: Content[] | [];
};
export type WindowsData = WindowsDataElement[];
