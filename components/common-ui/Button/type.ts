import type { Signal } from "@preact-signals/safe-react";
import type { ButtonHTMLAttributes, CSSProperties } from "react";

type BtnStyle = CSSProperties | "outline" | "dash" | "soft" | "ghost" | "link";

type BtnBehavior = "active" | "disabled";

type BtnColor =
  | "neutral"
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error";

type BtnSize = "xs" | "sm" | "md" | "lg" | "xl";

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "style"
> & {
  style?: BtnStyle;
  color?: BtnColor;
  size?: BtnSize;
  wide?: boolean;
  block?: boolean;
  square?: boolean;
  circle?: boolean;
  rounded?: boolean;
  className?: string;
  children?: React.ReactNode;
  behavior?: BtnBehavior;
  onClick?: () => void;
  text?: string | Signal<string>;
  type?: "button" | "submit" | "reset";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
};
