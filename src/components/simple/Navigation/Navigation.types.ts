import { WindowsDataElement } from "../../containers/Desktop/Desktop.types";

export type NavDataElement = {
  id: string;
  header: string;
  iconName: string;
};
export interface INavigation {
  data: { id: string; header: string }[];
  onWindowOpen: (props: WindowsDataElement, isNotFirstWindow: boolean) => void;
}
