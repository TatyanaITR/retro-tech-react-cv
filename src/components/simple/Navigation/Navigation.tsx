/*
import React, { useContext } from "react";
import styles from "./Navigation.module.css";
import { DesktopContext } from "../../containers/Desktop/Desktop.context";
import DraggableIcon from "../Icons/DraggableIcon/DraggableIcon";
import GridContainer from "../../containers/GridContainer/GridContainer";

const Navigation: React.FC = () => {
  const { navData } = useContext(DesktopContext);
  return (
    <nav role="navigation">
      <GridContainer direction="rows" className={styles["nav-grid-container"]}>
        {navData.map(({ id, header, iconName }) => (
          <DraggableIcon
            key={id}
            size="lg"
            label={header}
            iconName={iconName ? iconName : "defaultIcon"}
            windowProps={{ id }}
          />
        ))}
      </GridContainer>
    </nav>
  );
};

export default Navigation;
*/
