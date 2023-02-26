import React, { Reducer, useEffect, useReducer, useState } from "react";
import Window from "../../simple/Window/Window";
import MinimizedWindow from "../../simple/MinimizedWindow/MinimizedWindow";
import windowReducer, {
  initialState,
  IState,
} from "../../../core/store/windowReducer";
import { IAction } from "../../../core/store/windowReducer.types";
import { appSettings } from "../../../core/config/variables";
import styles from "./Desktop.module.css";
import {
  createWindow,
  createWindowData,
  getWindowData,
  isWindowOpen,
} from "./Desktop.helpers";
import { fetchData } from "../../../core/utils/hygraph.utils";
import Icon from "../../simple/Icon/Icon";
import { NavDataElement } from "../../simple/Navigation/Navigation.types";
import { IHandleIconDoubleClick, WindowsDataElement } from "./Desktop.types";
import Navigation from "../../simple/Navigation/Navigation";

export const Desktop: React.FC = () => {
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

  return (
    <>
      <div className={styles.desktop} id="desktop">
        <Navigation data={navData} onWindowOpen={handleIconDoubleClick} />
        {/*<button onClick={() => handleOpenWindow("cla8eqmt70b4o0cw1j3kbgrbm")}>
          1 Window
        </button>
        <button onClick={() => handleOpenWindow("cleki52d51f2t0bw1e8kp5riv")}>
          2 Window
        </button>*/}
        <Icon
          size="md"
          label="Тестовая иконка"
          iconName="icon-doc"
          onDoubleClick={() =>
            handleIconDoubleClick({ id: "cla8eqmt70b4o0cw1j3kbgrbm" })
          }
        />
        {store.windows.map((window) => (
          <Window
            key={window.id}
            {...window}
            onClose={handleCloseWindow}
            onMinimize={handleMinimizeWindow}
            onMouseDown={handleMouseDownWindow}
          />
        ))}
      </div>
      <div id="minimizedWindowsBar" className={styles.minimizedWindowsBar}>
        {store.minimizedWindows.map((window) => (
          <MinimizedWindow
            key={window.id}
            {...window}
            onClose={handleCloseWindow}
            onMinimize={handleMinimizeWindow}
            onMouseDown={handleMouseDownWindow}
            onRestore={handleRestoreWindow}
          />
        ))}
      </div>
    </>
  );
};
