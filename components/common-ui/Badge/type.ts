export type BadgeStyle = "outline" | "dash" | "soft" | "ghost";
export type BadgeColor =
  | "neutral"
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error";
export type BadgeSize = "xs" | "sm" | "md" | "lg" | "xl";

export type BadgeProps = {
  children?: React.ReactNode;
  text?: string;
  className?: string;
  style?: BadgeStyle;
  color?: BadgeColor;
  size?: BadgeSize;
  block?: boolean;
};
