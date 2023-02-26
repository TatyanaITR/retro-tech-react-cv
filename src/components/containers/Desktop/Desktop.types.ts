import { Size } from "../../../core/types/commonTypes";

export interface ContentDefault {
  defaultcontent: {
    html: string;
  };
}

export interface ContentJobsListItem {
  id: string;
  jobtitle: string;
}
export type Content = ContentDefault | ContentJobsListItem;

export type WindowsDataElement = {
  id: string;
  header: string;
  buttons: string[];
  size?: Size;
  windowtypes: string;
  content: Content[] | [];
};
export type WindowsData = WindowsDataElement[];
