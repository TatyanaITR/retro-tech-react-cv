import { WindowsData, WindowsDataElement } from "./Desktop.types";
import { IState } from "../../../core/store/windowReducer";
import { appSettings } from "../../../core/config/variables";
import { Coords } from "../../../core/types/commonTypes";
import { IWindow } from "../../simple/Window/Window";

const calcWindowCoords = (
  width: number,
  height: number,
  lastCoords: Coords
): Coords => {
  const { innerWidth, innerHeight } = window;
  if (
    lastCoords.x + width > innerWidth ||
    lastCoords.y + height > innerHeight
  ) {
    lastCoords = { x: 0, y: 0 };
  }

  lastCoords = {
    x: lastCoords.x + appSettings.cascadeStep,
    y: lastCoords.y + appSettings.cascadeStep,
  };

  return lastCoords;
};
const getWindowCoords = (
  isNotFirstWindow: boolean,
  windowWidth: number,
  windowHeight: number,
  lastCoords: Coords
): Coords => {
  let coords: Coords;
  if (isNotFirstWindow) {
    coords = calcWindowCoords(windowWidth, windowHeight, lastCoords);
    if (!coords.x || !coords.y) {
      throw new Error(`There is an error with coordinates`);
    }
  } else {
    coords = appSettings.initialCoords;
  }
  return coords;
};

const getWindowData = (data: WindowsData, id: number): WindowsDataElement => {
  const windowData = data.find((window) => window.id === id);
  if (!windowData) {
    throw new Error(`Window data not found for id ${id}`);
  }
  return windowData;
};

export const isWindowOpen = (state: IState, id: number): boolean => {
  return [...state.windows, ...state.minimizedWindows].some(
    (window) => window.id === id
  );
};

export const createNewWindow = (
  data: WindowsData,
  id: number,
  lastCoords: Coords,
  isNotFirstWindow: boolean,
  handleCloseWindow: (id: number) => void,
  handleMinimizeWindow: (id: number) => void,
  handleMouseDownWindow: (id: number) => void
) => {
  const windowContent = getWindowData(data, id);
  let coords: Coords = getWindowCoords(
    isNotFirstWindow,
    appSettings.mockWindowSize.w,
    appSettings.mockWindowSize.h,
    lastCoords
  );
  const newWindow: IWindow = {
    ...windowContent,
    coords,
    onClose: handleCloseWindow,
    onMinimize: handleMinimizeWindow,
    onMouseDown: handleMouseDownWindow,
  };
  return newWindow;
};
