import { IHandleIconDoubleClick, WindowsDataElement } from "./Desktop.types";
import { IState } from "../../../core/store/windowReducer-old";
import { appSettings } from "../../../core/config/variables";
import { Coords, Size } from "../../../core/types/commonTypes";
import { IBaseWindow } from "../../simple/Window/Window";

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
  if (!props.header || !props.windowType) {
    throw new Error("Header and windowType are required");
  }
  return {
    id: props.id,
    header: props.header,
    windowType: props.windowType,
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

/*export const createWindow = (
  windowContent: WindowsDataElement,
  lastCoords: Coords,
  isNotFirstWindow: boolean,
  handleCloseWindow: (id: string) => void,
  handleMinimizeWindow: (id: string) => void,
  handleMouseDownWindow: (id: string) => void,
  handleRestoreWindow: (id: string) => void
): IBaseWindow => {
  const { size } = windowContent;
  const defaultSize = {
    w: appSettings.defaultWindowSize.w,
    h: appSettings.defaultWindowSize.h,
  };
  const windowSize = size ? { ...size } : defaultSize;

  let coords: Coords = getWindowCoords(
    isNotFirstWindow,
    windowSize,
    lastCoords
  );

  const windowData = { ...windowContent, size: windowSize };
  return {
    ...windowData,
    coords,
    onClose: handleCloseWindow,
    onMinimize: handleMinimizeWindow,
    onMouseDown: handleMouseDownWindow,
    onRestore: handleRestoreWindow,
  };
};*/
