import { IWindow } from "../../components/simple/Window/Window";

interface IActionOpenWindow {
  type: "OPEN_WINDOW";
  window: IWindow;
}
interface IActionCloseWindow {
  type: "CLOSE_WINDOW";
  id: number;
}
interface IActionMinimizeWindow {
  type: "MINIMIZE_WINDOW";
  id: number;
}
interface IActionMaximizeWindow {
  type: "MAXIMIZE_WINDOW";
  id: number;
}

export type IAction =
  | IActionOpenWindow
  | IActionCloseWindow
  | IActionMinimizeWindow
  | IActionMaximizeWindow;
