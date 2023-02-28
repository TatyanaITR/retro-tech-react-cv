import React, {
  createContext,
  Reducer,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  IDesktopContext,
  IHandleIconDoubleClick,
  WindowsDataElement,
} from "./Desktop.types";
import { NavDataElement } from "../../simple/Navigation/Navigation.types";
import { fetchData } from "../../../core/utils/hygraph.utils";
import windowReducer, {
  initialState,
  IState,
} from "../../../core/store/windowReducer";
import { IAction } from "../../../core/store/windowReducer.types";
import { appSettings } from "../../../core/config/variables";
import {
  createWindow,
  createWindowData,
  getWindowData,
  isWindowOpen,
} from "./Desktop.helpers";

export const DesktopContext = createContext<IDesktopContext>({
  store: { windows: [], minimizedWindows: [] },
  navData: [],
  handleOpenWindow: () => {},
  handleMinimizeWindow: () => {},
  handleCloseWindow: () => {},
  handleRestoreWindow: () => {},
  handleMouseDownWindow: () => {},
  handleIconDoubleClick: () => {},
});

export const DesktopProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<WindowsDataElement[]>([]);
  useEffect(() => {
    fetchData()
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const navData: NavDataElement[] = data.map(
    (window): WindowsDataElement =>
      ({
        id: window.id,
        header: window.header,
      } as WindowsDataElement)
  );

  const [store, dispatch] = useReducer<Reducer<IState, IAction>>(
    windowReducer,
    initialState
  );
  const [lastCoords, setLastCoords] = useState(appSettings.initialCoords);

  const handleIconDoubleClick = (props: IHandleIconDoubleClick): void => {
    const isWindowAlreadyOpen = isWindowOpen(store, props.id);
    if (!isWindowAlreadyOpen) {
      const isNotFirstWindow: boolean = !!store.windows.length;
      let windowData: WindowsDataElement;
      if (props.header && props.windowtypes) {
        windowData = createWindowData(props);
      } else {
        windowData = getWindowData(data, props.id);
      }
      handleOpenWindow(windowData, isNotFirstWindow);
    }
  };
  const handleOpenWindow = (
    windowData: WindowsDataElement,
    isNotFirstWindow: boolean
  ) => {
    let newWindow = createWindow(
      windowData,
      lastCoords,
      isNotFirstWindow,
      handleCloseWindow,
      handleMinimizeWindow,
      handleMouseDownWindow,
      handleRestoreWindow
    );
    setLastCoords(newWindow.coords);
    console.log(newWindow);
    dispatch({ type: "OPEN_WINDOW", window: newWindow });
  };

  const handleCloseWindow = (id: string) => {
    dispatch({ type: "CLOSE_WINDOW", id });
  };

  const handleMinimizeWindow = (id: string) => {
    dispatch({ type: "MINIMIZE_WINDOW", id });
  };
  const handleMouseDownWindow = (id: string) => {
    dispatch({ type: "ACTIVATE_WINDOW", id });
  };
  const handleRestoreWindow = (id: string) => {
    dispatch({ type: "RESTORE_WINDOW", id });
  };

  const contextValue: IDesktopContext = {
    navData,
    store,
    handleOpenWindow,
    handleMinimizeWindow,
    handleCloseWindow,
    handleRestoreWindow,
    handleIconDoubleClick,
    handleMouseDownWindow,
  };

  return (
    <DesktopContext.Provider value={contextValue}>
      {children}
    </DesktopContext.Provider>
  );
};
