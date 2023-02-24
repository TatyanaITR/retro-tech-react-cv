import React, { Reducer, useReducer, useState } from "react";
import Window from "../../simple/Window/Window";
import MinimizedWindow from "../../simple/MinimizedWindow/MinimizedWindow";
import windowReducer, {
  initialState,
  IState,
} from "../../../core/store/windowReducer";
import { IAction } from "../../../core/store/windowReducer.types";
import { appSettings } from "../../../core/config/variables";
import styles from "./WindowList.module.css";
import { WindowsData } from "./WindowList.types";
import { createNewWindow, isWindowOpen } from "./WindowList.helpers";

export const WindowsList: React.FC = () => {
  const data: WindowsData = [
    {
      id: 1,
      header: "header 1",
      buttons: ["close"],
      content: "content 1",
    },
    {
      id: 2,
      header: "header 2",
      buttons: ["close", "minimize"],
      content: "content 2",
    },
  ];
  const [store, dispatch] = useReducer<Reducer<IState, IAction>>(
    windowReducer,
    initialState
  );
  const [lastCoords, setLastCoords] = useState(appSettings.initialCoords);

  const handleOpenWindow = (id: number) => {
    const isWindowAlreadyOpen = isWindowOpen(store, id);
    const isNotFirstWindow: boolean = !!store.windows.length;
    if (!isWindowAlreadyOpen) {
      let newWindow = createNewWindow(
        data,
        id,
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

  const handleCloseWindow = (id: number) => {
    dispatch({ type: "CLOSE_WINDOW", id });
  };

  const handleMinimizeWindow = (id: number) => {
    dispatch({ type: "MINIMIZE_WINDOW", id });
  };
  const handleMouseDownWindow = (id: number) => {
    dispatch({ type: "ACTIVATE_WINDOW", id: id });
  };
  const handleRestoreWindow = (id: number) => {
    dispatch({ type: "CLOSE_WINDOW", id });
    const isNotFirstWindow: boolean = !!store.windows.length;
    let newWindow = createNewWindow(
      data,
      id,
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
      <button onClick={() => handleOpenWindow(1)}>1 Window</button>
      <button onClick={() => handleOpenWindow(2)}>2 Window</button>
      <div id="windowsContainer" className={styles.windowsContainer}>
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
