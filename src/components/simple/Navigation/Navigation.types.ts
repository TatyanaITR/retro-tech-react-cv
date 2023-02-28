import { WindowsDataElement } from "../../containers/Desktop/Desktop.types";

export interface INavigation {
  data: { id: string; header: string }[];
  onWindowOpen: (props: WindowsDataElement, isNotFirstWindow: boolean) => void;
}
