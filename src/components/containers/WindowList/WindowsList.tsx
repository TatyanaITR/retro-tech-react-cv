import React, { useEffect, useReducer, useState } from "react";
import Window, { IWindow } from "../../simple/Window/Window";
import windowReducer from "../../../core/store/windowReducer";
import { getWindowCoords, isWindowOpen } from "./WindowList.helpers";
import { appSettings } from "../../../core/config/variables";
import styles from "./WindowList.module.css";
import { logDOM } from "@storybook/testing-library";

export const WindowsList: React.FC = () => {
  const data = [
    {
      id: 1,
      header: "header 1",
      buttons: ["close"],
    },
    {
      id: 2,
      header: "header 2",
      buttons: ["close", "minimize"],
    },
  ];
  const [windows, dispatch] = useReducer(windowReducer, []);
  const [lastCoords, setLastCoords] = useState(appSettings.initialCoords);

  const handleOpenWindow = (id: number) => {
    const windowData = data.find((window) => window.id === id);
    if (!windowData) {
      throw new Error(`Window data not found for id ${id}`);
    }
    const isWindowAlreadyOpen = isWindowOpen(windows, id);
    if (!isWindowAlreadyOpen) {
      let x: number, y: number;
      const isAnyWindowOnTheField = windows.some((window) => !window.minimized);
      if (!isAnyWindowOnTheField) {
        x = appSettings.initialCoords.x;
        y = appSettings.initialCoords.y;
        setLastCoords({ x, y });
      } else {
        ({ x, y } = getWindowCoords(300, 200, lastCoords));
        if (!x || !y) {
          throw new Error(`There is an error with coordinates`);
        }
        setLastCoords({
          x: x + appSettings.cascadeStep,
          y: y + appSettings.cascadeStep,
        });
      }
      const newWindow: IWindow = {
        ...windowData,
        x: x,
        y: y,
        minimized: false,
        maximized: false,
        onClose: handleCloseWindow,
        onMinimize: handleMinimizeWindow,
        onMaximize: handleMaximizeWindow,
      };
      dispatch({ type: "OPEN_WINDOW", window: newWindow });
    }
  };

  const handleCloseWindow = (id: number) => {
    dispatch({ type: "CLOSE_WINDOW", id });
  };

  const handleMinimizeWindow = (id: number) => {
    dispatch({ type: "MINIMIZE_WINDOW", id });
  };

  const handleMaximizeWindow = (id: number) => {
    dispatch({ type: "MAXIMIZE_WINDOW", id });
  };

  useEffect(() => {
    const windowsContainer = document.getElementById("windowsContainer");
    const minimizedWindowsBar = document.getElementById("minimizedWindowsBar");
    if (!windowsContainer || !minimizedWindowsBar) {
      throw new Error(`This is an layout error`);
    }
    windows.forEach((window) => {
      const windowElement = document.getElementById(`window-${window.id}`);

      if (window.minimized) {
        if (windowElement) {
          minimizedWindowsBar.appendChild(windowElement);
        }
      } else {
        if (windowElement) {
          windowsContainer.appendChild(windowElement);
        }
      }
    });

    const handleWindowClick = (id: number) => {
      dispatch({ type: "RESTORE_WINDOW", id });
    };

    const handleMinimizedWindowsBarClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target && target.dataset.windowId) {
        const id = parseInt(target.dataset.windowId);
        dispatch({ type: "RESTORE_WINDOW", id });
      }
    };

    windows.forEach((window) => {
      const windowElement = document.getElementById(`window-${window.id}`);

      if (windowElement) {
        windowElement.addEventListener("click", () => {
          handleWindowClick(window.id);
        });
      }
    });

    minimizedWindowsBar.addEventListener(
      "click",
      handleMinimizedWindowsBarClick
    );

    return () => {
      minimizedWindowsBar.removeEventListener(
        "click",
        handleMinimizedWindowsBarClick
      );
    };
  }, [windows]);

  return (
    <>
      <button onClick={() => handleOpenWindow(1)}>1 Window</button>
      <button onClick={() => handleOpenWindow(2)}>2 Window</button>
      <div id="windowsContainer" className={styles.windowsContainer}>
        {windows.map((window) => (
          <Window
            key={window.id}
            {...window}
            onClose={handleCloseWindow}
            onMinimize={handleMinimizeWindow}
            onMaximize={handleMaximizeWindow}
          />
        ))}
      </div>
      <div
        id="minimizedWindowsBar"
        className={styles.minimizedWindowsBar}
      ></div>
    </>
  );
};
