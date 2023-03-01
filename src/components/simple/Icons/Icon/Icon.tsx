import React from "react";
import styles from "../Icons.module.css";
import cn from "classnames";

export interface IIcon {
  iconName?: string;
  size?: "xs" | "sm" | "md" | "lg";
}

const Icon: React.FC<IIcon> = ({ iconName = "defaultIcon", size = "xs" }) => {
  const iconPath = `./icons/${iconName}.svg`;
  const iconClassNames = cn(styles.icon, styles[`icon-${size}`]);
  return (
    <div className={iconClassNames}>
      <img
        src={iconPath}
        alt={iconName + "-icon"}
        className={styles[`icon-img`]}
      />
    </div>
  );
};

export default Icon;
