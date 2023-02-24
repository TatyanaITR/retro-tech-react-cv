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
    case "ACTIVATE_WINDOW":
      return {
        ...state,
        windows: state.windows.map((window) => ({
          ...window,
          isActive: window.id === action.id,
        })),
      };
    default:
      return state;
  }
}

export default windowReducer;
