import { IBaseWindow } from "../../components/simple/Window/Window";

interface IActionOpenWindow {
  type: "OPEN_WINDOW";
  window: IBaseWindow;
}
interface IActionCloseWindow {
  type: "CLOSE_WINDOW";
  id: string;
}
interface IActionMinimizeWindow {
  type: "MINIMIZE_WINDOW";
  id: string;
}
interface IActionRestoreWindow {
  type: "RESTORE_WINDOW";
  id: string;
}
interface IActionActivateWindow {
  type: "ACTIVATE_WINDOW";
  id: string;
}

export type IAction =
  | IActionOpenWindow
  | IActionCloseWindow
  | IActionMinimizeWindow
  | IActionRestoreWindow
  | IActionActivateWindow;
