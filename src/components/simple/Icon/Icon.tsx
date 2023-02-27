import React, { useState } from "react";
import styles from "./Icon.module.css";
import cn from "classnames";
import DraggableElement from "../../containers/DraggableElement/DraggableElement";

export interface IIcon {
  iconName: string;
  label: string;
  size: "sm" | "md" | "lg";
  onDoubleClick: () => void;
}

const Icon: React.FC<IIcon> = ({
  iconName,
  label,
  size = "md",
  onDoubleClick,
}) => {
  const [isSelect, setIsSelect] = useState(false);

  const handleIconClick = () => {
    setIsSelect(true);
  };
  const handleContainerBlur = () => {
    setIsSelect(false);
  };
  const handleDoubleClick = () => {
    onDoubleClick();
  };
  const handleTab = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Tab") {
      setIsSelect(true);
    }
  };

  const iconPath = `${import.meta.env.VITE_PUBLIC_PATH}/icons/${iconName}.svg`;
  const iconClassNames = cn(styles.icon, styles[`icon-${size}`], {
    [styles["icon-select"]]: isSelect,
  });

  return (
    <DraggableElement id={label} className={styles["draggable-icon"]}>
      <div
        className={iconClassNames}
        onDoubleClick={handleDoubleClick}
        onClick={handleIconClick}
        onBlur={handleContainerBlur}
        onKeyDown={handleTab}
        tabIndex={0}
      >
        <img src={iconPath} alt={label} className="icon-img" />
        <span className="icon-label">{label}</span>
      </div>
    </DraggableElement>
  );
};

export default Icon;
