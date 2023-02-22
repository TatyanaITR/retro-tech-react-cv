import { IAction } from "../types/windowTypes";
import { IWindow } from "../../components/simple/Window/Window";

function windowReducer(state: IWindow[], action: IAction) {
  switch (action.type) {
    case "OPEN_WINDOW":
      return [
        ...state,
        {
          ...action.window,
        },
      ];
    case "CLOSE_WINDOW":
      return state.filter((window) => window.id !== action.id);
    case "MINIMIZE_WINDOW":
      return state.map((window) =>
        window.id === action.id
          ? { ...window, minimized: true, maximized: false }
          : window
      );
    case "MAXIMIZE_WINDOW":
      return state.map((window) =>
        window.id === action.id
          ? { ...window, minimized: false, maximized: true }
          : window
      );
    default:
      return state;
  }
}

export default windowReducer;
