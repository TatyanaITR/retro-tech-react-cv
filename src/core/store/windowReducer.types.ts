import { IWindow } from "../../components/simple/Window/Window";
import { IMinimizedWindow } from "../../components/simple/MinimizedWindow/MinimizedWindow";

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

export type IAction =
  | IActionOpenWindow
  | IActionCloseWindow
  | IActionMinimizeWindow;

export function windowToMinimizedWindow(window: IWindow): IMinimizedWindow {
  return {
    id: window.id,
    header: window.header,
    onClose: window.onClose,
    onRestore: window.onMinimize,
  };
}
