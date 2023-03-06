import { Size } from "../../../core/types/commonTypes";
import { IState } from "../../../core/store/windowReducer-old";

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
  windowType: string;
  content: Content[] | [];
  iconName?: string;
};

/*export interface IFolder {
  id: string;
  iconName?: string;
  tooltip?: string;
  isRemovable: boolean;
  title: string;
  innerDocs?: IFolder[] | IDocument[];
}*/
/*export interface IDocument {
  id: string;
  iconName?: string;
  tooltip?: string;
  isRemovable: boolean;
  header: string;
  buttons?: string[];
  size?: Size;
  windowType: string;
  content: Content[] | [];
}*/

export interface IHandleIconDoubleClick {
  id: string;
  header?: string;
  windowType?: string;
  buttons?: string[];
  size?: Size;
  content?: [] | WindowsDataElement[];
  handlerFunction?: (...args: any[]) => any;
}

export interface IDesktopContext {
  store: IState;
  handleMinimizeWindow: (id: string) => void;
  handleCloseWindow: (id: string) => void;
  handleRestoreWindow: (id: string) => void;
  handleMouseDownWindow: (id: string) => void;
  /* navData: WindowsDataElement[];
   handleIconDoubleClick: (props: IHandleIconDoubleClick) => void;*/
}
