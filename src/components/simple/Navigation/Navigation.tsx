import React, { useContext } from "react";
import Icon from "../Icon/Icon";
import styles from "./Navigation.module.css";
import { DesktopContext } from "../../containers/Desktop/Desktop.context";

const Navigation: React.FC = () => {
  const { navData } = useContext(DesktopContext);
  return (
    <nav className={styles.container}>
      {navData.map(({ id, header, iconName }) => (
        <Icon
          key={id}
          size="md"
          label={header}
          iconName={iconName ? iconName : "defaultIcon"}
          windowProps={{ id }}
        />
      ))}
    </nav>
  );
};

export default Navigation;
