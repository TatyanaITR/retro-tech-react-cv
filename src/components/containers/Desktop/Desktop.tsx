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
import { WindowsData } from "./Desktop.types";
import { createNewWindow, isWindowOpen } from "./Desktop.helpers";
import { fetchData } from "../../../core/utils/hygraph.utils";

export const Desktop: React.FC = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData()
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  /*const data: WindowsData = [
    {
      id: 1,
      header: "header 1",
      buttons: ["close"],
      type: "default",
      content: [
        {
          defaultcontent: {
            html: "<p>Content AboutMe</p>",
          },
        },
      ],
    },
    {
      id: 2,
      header: "header 2",
      buttons: ["close", "minimize"],
      type: "feedback",
      content: [],
    },
  ];*/
  const [store, dispatch] = useReducer<Reducer<IState, IAction>>(
    windowReducer,
    initialState
  );
  const [lastCoords, setLastCoords] = useState(appSettings.initialCoords);

  const handleOpenWindow = (id: string) => {
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
      <button onClick={() => handleOpenWindow("cla8eqmt70b4o0cw1j3kbgrbm")}>
        1 Window
      </button>
      <button onClick={() => handleOpenWindow("")}>2 Window</button>
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
