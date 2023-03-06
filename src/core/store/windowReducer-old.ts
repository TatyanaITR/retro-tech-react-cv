import { IAction } from "./windowReducer.types";
import { IBaseWindow } from "../../components/simple/Window/Window";

type IWindowState = Array<IBaseWindow>;
type IMinimizedWindowState = Array<IBaseWindow>;

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
        windows: [
          ...state.windows.map((window) => ({ ...window, isActive: false })),
          { ...action.window, isActive: true },
        ],
      };
    case "CLOSE_WINDOW":
      const updatedWindows = state.windows
        .filter((window) => window.id !== action.id)
        .map((window, index, windows) => ({
          ...window,
          isActive: windows.length === 1 || index === windows.length - 1,
        }));
      return {
        ...state,
        windows: updatedWindows,
        minimizedWindows: state.minimizedWindows.filter(
          (window) => window.id !== action.id
        ),
      };

    case "MINIMIZE_WINDOW":
      const minimizedWindow = state.windows.find(
        (window) => window.id === action.id
      );
      if (!minimizedWindow) {
        throw new Error("There is a problem with minimized window");
      }
      const updatedWindowsOnMinimize = state.windows.map((window) => ({
        ...window,
        isActive: window.id !== action.id && window.isActive,
      }));
      return {
        ...state,
        windows: updatedWindowsOnMinimize.filter(
          (window) => window.id !== action.id
        ),
        minimizedWindows: [...state.minimizedWindows, minimizedWindow],
      };

    case "ACTIVATE_WINDOW":
      return {
        ...state,
        windows: state.windows.map((window) => ({
          ...window,
          isActive: window.id === action.id,
        })),
      };
    case "RESTORE_WINDOW":
      const restoredWindow: IBaseWindow | undefined =
        state.minimizedWindows.find((window) => window.id === action.id);
      if (!restoredWindow) {
        throw new Error("There is a problem with restored window");
      }
      const updatedWindowsOnRestore = state.windows.map((window) => ({
        ...window,
        isActive: false,
      }));
      return {
        ...state,
        windows: [
          ...updatedWindowsOnRestore,
          { ...restoredWindow, isActive: true },
        ],
        minimizedWindows: state.minimizedWindows.filter(
          (window) => window.id !== action.id
        ),
      };
    default:
      return state;
  }
}

export default windowReducer;
