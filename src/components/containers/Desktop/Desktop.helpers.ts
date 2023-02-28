import { IHandleIconDoubleClick, WindowsDataElement } from "./Desktop.types";
import { IState } from "../../../core/store/windowReducer";
import { appSettings } from "../../../core/config/variables";
import { Coords, Size } from "../../../core/types/commonTypes";
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
export const getWindowCoords = (
  isNotFirstWindow: boolean,
  size: Size,
  lastCoords: Coords
): Coords => {
  let coords: Coords;
  if (isNotFirstWindow) {
    coords = calcWindowCoords(size.w, size.h, lastCoords);
    if (!coords.x || !coords.y) {
      throw new Error(`There is an error with coordinates`);
    }
  } else {
    coords = appSettings.initialCoords;
  }
  return coords;
};

export const getWindowData = (
  data: WindowsDataElement[],
  id: string
): WindowsDataElement => {
  const windowData = data.find((window) => window.id === id);
  if (!windowData) {
    throw new Error(`Window data not found for id ${id}`);
  }
  return windowData;
};
export const createWindowData = (
  props: IHandleIconDoubleClick
): WindowsDataElement => {
  if (!props.header || !props.windowtypes) {
    throw new Error("Header and windowtypes are required");
  }
  return {
    id: props.id,
    header: props.header,
    windowtypes: props.windowtypes,
    buttons: props.buttons,
    size: props.size,
    content: [],
  };
};

export const isWindowOpen = (state: IState, id: string): boolean => {
  return [...state.windows, ...state.minimizedWindows].some(
    (window) => window.id === id
  );
};

export const createWindow = (
  windowContent: WindowsDataElement,
  lastCoords: Coords,
  isNotFirstWindow: boolean,
  handleCloseWindow: (id: string) => void,
  handleMinimizeWindow: (id: string) => void,
  handleMouseDownWindow: (id: string) => void,
  handleRestoreWindow: (id: string) => void
): IWindow => {
  let coords: Coords = getWindowCoords(
    isNotFirstWindow,
    windowContent.size
      ? { w: windowContent.size.w, h: windowContent.size.h }
      : { w: appSettings.mockWindowSize.w, h: appSettings.mockWindowSize.h },
    lastCoords
  );
  return {
    ...windowContent,
    coords,
    onClose: handleCloseWindow,
    onMinimize: handleMinimizeWindow,
    onMouseDown: handleMouseDownWindow,
    onRestore: handleRestoreWindow,
  };
};
