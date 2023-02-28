import { Size } from "../../../core/types/commonTypes";
import { IState } from "../../../core/store/windowReducer";

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
  buttons?: string[];
  size?: Size;
  windowtypes: string;
  content: Content[] | [];
  iconName?: string;
};

export interface IHandleIconDoubleClick {
  id: string;
  header?: string;
  windowtypes?: string;
  buttons?: string[];
  size?: Size;
  content?: [] | WindowsDataElement[];
  handlerFunction?: (...args: any[]) => any;
}

export interface IDesktopContext {
  store: IState;
  navData: WindowsDataElement[];
  handleMinimizeWindow: (id: string) => void;
  handleCloseWindow: (id: string) => void;
  handleRestoreWindow: (id: string) => void;
  handleMouseDownWindow: (id: string) => void;
  handleIconDoubleClick: (props: IHandleIconDoubleClick) => void;
}
