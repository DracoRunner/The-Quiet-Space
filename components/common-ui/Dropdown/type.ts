import type { HTMLAttributes, MenuHTMLAttributes } from "react";

type DropdownAlign = "start" | "center" | "end";
type DropdownPlacement = "top" | "bottom" | "left" | "right";
export type DropdownProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
  trigger?: React.ReactNode; // element that toggles the dropdown
  open?: boolean; // controlled open state
  defaultOpen?: boolean; // uncontrolled initial state
  hover?: boolean; // open on hover
  align?: DropdownAlign; // start | center | end -> dropdown-start / dropdown-end
  placement?: DropdownPlacement; // top | bottom | left | right -> dropdown-top etc.
  menuClassName?: string; // additional classes for the dropdown menu (dropdown-content)
  menuProps?: Omit<MenuHTMLAttributes<HTMLUListElement>, "className"> & {
    className?: string;
  };
  children?: React.ReactNode; // expected: trigger + menu or just menu when using render props
};
