import clsx from "clsx";
import type { FC } from "react";
import type { BadgeProps } from "./type";

const getBadgeClass = (props: BadgeProps) => {
  const classes: string[] = [];
  classes.push("badge");
  if (props.style) classes.push(`badge-${props.style}`);
  if (props.color) classes.push(`badge-${props.color}`);
  if (props.size) classes.push(`badge-${props.size}`);
  if (props.block) classes.push("block");
  return classes.join(" ");
};

const Badge: FC<BadgeProps> = (props) => {
  const { children, text, className } = props;
  const classNames = getBadgeClass(props);

  return (
    <span className={clsx(classNames, className)}>{children ?? text}</span>
  );
};

export default Badge;
