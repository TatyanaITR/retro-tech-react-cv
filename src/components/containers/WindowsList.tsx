import React, { useEffect, useReducer, useState } from "react";
import Window, { IWindow } from "../simple/Window/Window";
import windowReducer from "../../core/store/windowReducer";
import { getWindowCoords, ICoords, isWindowOpen } from "./helpers";

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
  const [lastCoords, setLastCoords] = useState<ICoords>({ x: 20, y: 15 });
  const [openWindowsNumber, setOpenWindowsNumber] = useState(0);

  /*  useEffect(() => {
    /!*const fetchData = async () => {
      const data = await fetchWindowData();
      data.forEach((windowData: any) => {
        const id = windowData.id;
        dispatch({ type: 'NEW_WINDOW', id, x: windowData.x, y: windowData.y });
        setNextId(Math.max(nextId, id + 1));
        setLastCoords({ x: windowData.x + 100, y: windowData.y + 100 });
      });
    };
    fetchData();*!/
  }, []);*/

  const handleOpenWindow = (id: number) => {
    const windowData = data.find((window) => window.id === id);
    if (!windowData) {
      throw new Error(`Window data not found for id ${id}`);
    }
    const isWindowAlreadyOpen = isWindowOpen(windows, id);
    if (!isWindowAlreadyOpen) {
      const { x, y } = getWindowCoords(lastCoords, 300, 200);
      setLastCoords({ x: x + 20, y: y + 20 });
      const newWindow: IWindow = {
        x,
        y,
        minimized: false,
        maximized: false,
        onClose: handleCloseWindow,
        onMinimize: handleMinimizeWindow,
        onMaximize: handleMaximizeWindow,
        ...windowData,
      };
      dispatch({ type: "OPEN_WINDOW", window: newWindow });
      setOpenWindowsNumber(openWindowsNumber + 1);
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

  return (
    <>
      <div>
        <button onClick={() => handleOpenWindow(1)}>1 Window</button>
        <button onClick={() => handleOpenWindow(2)}>2 Window</button>
        {windows.map((window) => (
          <Window
            key={window.id}
            {...window}
            buttons={["close", "minimize", "maximize"]}
            onClose={handleCloseWindow}
            onMinimize={handleMinimizeWindow}
            onMaximize={handleMaximizeWindow}
          />
        ))}
      </div>
    </>
  );
};
