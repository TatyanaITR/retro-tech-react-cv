import React, { useState } from "react";
import styles from "../Icons.module.css";
import cn from "classnames";
import DraggableElement from "../../../containers/DraggableElement/DraggableElement";
import { IIcon } from "../Icon/Icon";
import { defaultIcons } from "./DraggableIcon.helpers";
import { DocType } from "../../../../core/api/files.types";

export interface IDraggableIcon extends IIcon {
  id: string;
  label: string;
  type: DocType;
  linkType?: string;
  handleIconDoubleClick: (id: string, type: string) => void;
}

const DraggableIcon: React.FC<IDraggableIcon> = ({
  id,
  label,
  size = "lg",
  type,
  iconName = defaultIcons[type],
  handleIconDoubleClick,
}) => {
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
    <DraggableElement id={id} className={styles["draggable-icon"]}>
      <div
        className={iconClassNames}
        onDoubleClick={() => {
          handleIconDoubleClick(id, type);
        }}
        onClick={handleIconClick}
        onBlur={handleContainerBlur}
        onKeyDown={handleTab}
        tabIndex={0}
      >
        <img src={iconPath} alt={label} className={styles[`icon-img`]} />
        {label && <span className={styles["icon-label"]}>{label}</span>}
      </div>
    </DraggableElement>
  );
};

export default DraggableIcon;
