import React from "react";
import Icon from "../Icon/Icon";
import styles from "./Navigation.module.css";

export interface INavigation {
  data: { id: string; header: string }[];
  onWindowOpen: (id: string) => void;
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
          onDoubleClick={() => onWindowOpen(id)}
        />
      ))}
    </nav>
  );
};

export default Navigation;
