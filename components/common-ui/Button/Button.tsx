import clsx from "clsx";
import type { FC } from "react";
import type { ButtonProps } from "./type";

const getBtnClass = (props: ButtonProps) => {
  const classes: string[] = [];
  if (props.color) classes.push(`btn-${props.color}`);
  if (props.style) classes.push(`btn-${props.style}`);
  if (props.behavior) classes.push(`btn-${props.behavior}`);
  if (props.size) classes.push(`btn-${props.size}`);
  if (props.wide) classes.push("btn-wide");
  if (props.block) classes.push("btn-block");
  if (props.square) classes.push("btn-square");
  if (props.circle) classes.push("btn-circle");
  if (props.rounded) classes.push("btn-rounded");

  return classes.join(" ");
};

const Button: FC<ButtonProps> = (props) => {
  const {
    className,
    children,
    color,
    style,
    behavior,
    size = "md",
    wide,
    block,
    square,
    circle,
    ...buttonProps
  } = props;

  const btnClassName = getBtnClass({
    color,
    style,
    behavior,
    size,
    wide,
    block,
    square,
    circle,
  });

  return (
    <button
      {...buttonProps}
      className={clsx("btn cursor-pointer", btnClassName, className)}
    >
      {props.startIcon}
      {children ?? props.text}
      {props.endIcon}
    </button>
  );
};

export default Button;
