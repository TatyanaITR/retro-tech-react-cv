import React from "react";
import Icon from "../Icon/Icon";
import styles from "./Navigation.module.css";
import { IHandleIconDoubleClick } from "../../containers/Desktop/Desktop.types";

export interface INavigation {
  data: { id: string; header: string }[];
  onWindowOpen: (props: IHandleIconDoubleClick) => void;
}

const Navigation: React.FC<INavigation> = ({ data, onWindowOpen }) => {
  return (
    <nav>
      {data.map(({ id, header }) => (
        <Icon
          key={id}
          size="md"
          label={header}
          iconName="icon-doc"
          onDoubleClick={() => onWindowOpen({ id })}
        />
      ))}
    </nav>
  );
};

export default Navigation;
