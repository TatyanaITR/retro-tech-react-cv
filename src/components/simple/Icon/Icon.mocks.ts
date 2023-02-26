import { IIcon } from "./Icon";

const base: IIcon = {
  size: "md",
  label: "Тестовая иконка",
  iconName: "icon-doc",
  onDoubleClick: () => console.log("doubleClick"),
};

export const mockIconProps = {
  base,
};
