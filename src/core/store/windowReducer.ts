import { IAction, windowToMinimizedWindow } from "./windowReducer.types";
import { IWindow } from "../../components/simple/Window/Window";
import { IMinimizedWindow } from "../../components/simple/MinimizedWindow/MinimizedWindow";

type IWindowState = Array<IWindow>;
type IMinimizedWindowState = Array<IMinimizedWindow>;

export interface IState {
  windows: IWindowState;
  minimizedWindows: IMinimizedWindowState;
}

export const initialState: IState = {
  windows: [],
  minimizedWindows: [],
};

function windowReducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case "OPEN_WINDOW":
      return {
        ...state,
        windows: [...state.windows, action.window],
      };
    case "CLOSE_WINDOW":
      return {
        ...state,
        windows: state.windows.filter((window) => window.id !== action.id),
        minimizedWindows: state.minimizedWindows.filter(
          (window) => window.id !== action.id
        ),
      };
    case "MINIMIZE_WINDOW":
      const windowToMinimize = state.windows.find(
        (window) => window.id === action.id
      );
      if (windowToMinimize) {
        return {
          ...state,
          windows: state.windows.filter((window) => window.id !== action.id),
          minimizedWindows: [
            ...state.minimizedWindows,
            { ...windowToMinimizedWindow(windowToMinimize) },
          ],
        };
      }
      return state;
    /*case "RESTORE_WINDOW":
      const windowToRestore = state.minimizedWindows.find(
        (window) => window.id === action.id
      );
      if (windowToRestore) {
        return {
          ...state,
          minimizedWindows: state.minimizedWindows.filter(
            (window) => window.id !== action.id
          ),
          windows: [...state.windows, { ...windowToRestore, minimized: false }],
        };
      }
      return state;*/
    default:
      return state;
  }
}

export default windowReducer;
