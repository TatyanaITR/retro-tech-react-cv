import React, { useContext, useState } from "react";
import styles from "./Icon.module.css";
import cn from "classnames";
import DraggableElement from "../../containers/DraggableElement/DraggableElement";
import { DesktopContext } from "../../containers/Desktop/Desktop.context";
import { IHandleIconDoubleClick } from "../../containers/Desktop/Desktop.types";

interface IIcon {
  iconName: string;
  label?: string;
  size: "sm" | "md" | "lg";
  windowProps: IHandleIconDoubleClick;
}

const Icon: React.FC<IIcon> = ({
  iconName,
  label,
  size = "md",
  windowProps,
}) => {
  const { handleIconDoubleClick } = useContext(DesktopContext);
  const [isSelect, setIsSelect] = useState(false);

  const handleIconClick = () => {
    setIsSelect(true);
  };
  const handleContainerBlur = () => {
    setIsSelect(false);
  };
  const handleTab = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Tab") {
      setIsSelect(true);
    }
  };

  const iconPath = `./icons/${iconName}.svg`;
  const iconClassNames = cn(styles.icon, styles[`icon-${size}`], {
    [styles["icon-select"]]: isSelect,
  });

  return (
    <DraggableElement id={windowProps.id} className={styles["draggable-icon"]}>
      <div
        className={iconClassNames}
        onDoubleClick={() => {
          handleIconDoubleClick(windowProps);
        }}
        onClick={handleIconClick}
        onBlur={handleContainerBlur}
        onKeyDown={handleTab}
        tabIndex={0}
      >
        <img src={iconPath} alt={label} className="icon-img" />
        {label && <span className="icon-label">{label}</span>}
      </div>
    </DraggableElement>
  );
};

export default Icon;
