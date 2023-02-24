import { Size } from "../../../core/types/commonTypes";

export type WindowsDataElement = {
  id: number;
  header: string;
  buttons: string[];
  size?: Size;
};
export type WindowsData = WindowsDataElement[];
