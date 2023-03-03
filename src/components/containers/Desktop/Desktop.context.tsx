/*
import React, {
  createContext,
  Reducer,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import { getDesktop, supabase } from "../../../core/utils/supabase.utils";
import {
  Folder,
  IDesktopContext,
  IHandleIconDoubleClick,
  WindowsDataElement,
} from "./Desktop.types";
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
  handleMinimizeWindow: () => {},
  handleCloseWindow: () => {},
  handleRestoreWindow: () => {},
  handleMouseDownWindow: () => {},
  /!*navData: [],
  handleIconDoubleClick: () => {},*!/
});

export const DesktopProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [rootFolder, setRootFolder] = useState<Folder>();
  const [lastCoords, setLastCoords] = useState(appSettings.initialCoords);

  useEffect(() => {
    getDesktop()
      .then((data) => {
        if (data) setRootFolder(data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(rootFolder);
  }, []);

  const [store, dispatch] = useReducer<Reducer<IState, IAction>>(
    windowReducer,
    initialState
  );

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

  /!*
  const handleIconDoubleClick = useCallback(
    (props: IHandleIconDoubleClick): void => {
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
    },
    [store, data]
  );

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
    dispatch({ type: "OPEN_WINDOW", window: newWindow });
  };


*!/
  const contextValue: IDesktopContext = {
    store,
    handleMinimizeWindow,
    handleCloseWindow,
    handleRestoreWindow,
    handleMouseDownWindow,
    /!*navData,
    handleIconDoubleClick,*!/
  };
  return (
    <DesktopContext.Provider value={contextValue}>
      {children}
    </DesktopContext.Provider>
  );
};
*/
