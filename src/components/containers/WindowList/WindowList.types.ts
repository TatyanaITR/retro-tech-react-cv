import { Size } from "../../../core/types/commonTypes";
import { ReactNode } from "react";

export type WindowsDataElement = {
  id: number;
  header: string;
  buttons: string[];
  size?: Size;
  content: ReactNode;
};
export type WindowsData = WindowsDataElement[];
