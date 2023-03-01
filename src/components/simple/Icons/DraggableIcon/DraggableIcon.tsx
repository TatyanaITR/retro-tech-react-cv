import React, { useContext, useState } from "react";
import styles from "../Icons.module.css";
import cn from "classnames";
import DraggableElement from "../../../containers/DraggableElement/DraggableElement";
import { DesktopContext } from "../../../containers/Desktop/Desktop.context";
import { IHandleIconDoubleClick } from "../../../containers/Desktop/Desktop.types";
import { IIcon } from "../Icon/Icon";

interface IDraggableIcon extends IIcon {
  label: string;
  windowProps: IHandleIconDoubleClick;
}

const DraggableIcon: React.FC<IDraggableIcon> = ({
  iconName = "defaultIcon",
  label,
  size = "lg",
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
        <img src={iconPath} alt={label} className={styles[`icon-img`]} />
        {label && <span className="icon-label">{label}</span>}
      </div>
    </DraggableElement>
  );
};

export default DraggableIcon;
