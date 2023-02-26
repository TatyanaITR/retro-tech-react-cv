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
import { createWindow, getWindowData, isWindowOpen } from "./Desktop.helpers";
import { fetchData } from "../../../core/utils/hygraph.utils";
import Icon from "../../simple/Icon/Icon";
import { NavDataElement } from "../../simple/Navigation/Navigation.types";
import { WindowsDataElement } from "./Desktop.types";
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

  const handleOpenWindow = (id: string) => {
    const isWindowAlreadyOpen = isWindowOpen(store, id);
    const isNotFirstWindow: boolean = !!store.windows.length;
    if (!isWindowAlreadyOpen) {
      const windowContent = getWindowData(data, id);
      let newWindow = createWindow(
        windowContent,
        lastCoords,
        isNotFirstWindow,
        handleCloseWindow,
        handleMinimizeWindow,
        handleMouseDownWindow
      );
      setLastCoords(newWindow.coords);
      dispatch({ type: "OPEN_WINDOW", window: newWindow });
    }
  };

  const handleCloseWindow = (id: string) => {
    dispatch({ type: "CLOSE_WINDOW", id });
  };

  const handleMinimizeWindow = (id: string) => {
    dispatch({ type: "MINIMIZE_WINDOW", id });
  };
  const handleMouseDownWindow = (id: string) => {
    dispatch({ type: "ACTIVATE_WINDOW", id: id });
  };
  const handleRestoreWindow = (id: string) => {
    dispatch({ type: "CLOSE_WINDOW", id });
    const isNotFirstWindow: boolean = !!store.windows.length;
    const windowContent = getWindowData(data, id);
    let newWindow = createWindow(
      windowContent,
      lastCoords,
      isNotFirstWindow,
      handleCloseWindow,
      handleMinimizeWindow,
      handleMouseDownWindow
    );
    setLastCoords(newWindow.coords);
    dispatch({ type: "OPEN_WINDOW", window: newWindow });
  };

  return (
    <>
      <div className={styles.desktop} id="desktop">
        <Navigation data={navData} onWindowOpen={handleOpenWindow} />
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
          onDoubleClick={() => handleOpenWindow("cla8eqmt70b4o0cw1j3kbgrbm")}
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
            onRestore={handleRestoreWindow}
          />
        ))}
      </div>
    </>
  );
};
