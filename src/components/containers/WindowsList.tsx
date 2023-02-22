import React, { useEffect, useReducer, useState } from "react";
import Window, { IWindow } from "../simple/Window/Window";
import windowReducer from "../../core/store/windowReducer";

export const WindowsList: React.FC<{}> = (props) => {
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
  const [openWindowsNumber, setOpenWindowsNumber] = useState(0);
  const [lastCoords, setLastCoords] = useState({ x: 0, y: 0 });

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
    const initCoords = { x: 20, y: 10 };
    const { x, y } = lastCoords;
    const windowData = data.find((window) => window.id === id);
    if (!windowData) {
      throw new Error(`Window data not found for id ${id}`);
    }
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
