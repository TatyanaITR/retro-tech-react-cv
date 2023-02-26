import { IAction } from "./windowReducer.types";
import { IWindow } from "../../components/simple/Window/Window";

type IWindowState = Array<IWindow>;
type IMinimizedWindowState = Array<IWindow>;

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
      const inactiveWindows = state.windows.map((window) => {
        return {
          ...window,
          isActive: false,
        };
      });
      return {
        ...state,
        windows: [...inactiveWindows, { ...action.window, isActive: true }],
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
      const minimizedWindow: IWindow | undefined = state.windows.find(
        (window) => window.id === action.id
      );
      if (!minimizedWindow) {
        throw new Error("There is a problem with minimized window");
      }
      return {
        ...state,
        windows: state.windows.filter((window) => window.id !== action.id),
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
      const restoredWindow: IWindow | undefined = state.minimizedWindows.find(
        (window) => window.id === action.id
      );
      if (!restoredWindow) {
        throw new Error("There is a problem with restored window");
      }
      return {
        ...state,
        windows: [...state.windows, restoredWindow],
        minimizedWindows: state.minimizedWindows.filter(
          (window) => window.id !== action.id
        ),
      };
    default:
      return state;
  }
}

export default windowReducer;
