import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import type { DropdownProps } from "./type";

const getDropdownClass = (props: DropdownProps) => {
  const classes: string[] = [];
  classes.push("dropdown");
  if (props.align === "start") classes.push("dropdown-start");
  if (props.align === "end") classes.push("dropdown-end");
  if (props.placement === "top") classes.push("dropdown-top");
  if (props.placement === "left") classes.push("dropdown-left");
  if (props.placement === "right") classes.push("dropdown-right");

  return classes.join(" ");
};

const Dropdown = (props: DropdownProps) => {
  const {
    className,
    trigger,
    children,
    hover = false,
    open: controlledOpen,
    defaultOpen = false,
    menuClassName,
    menuProps,
    ...rest
  } = props;

  const [open, setOpen] = useState<boolean>(controlledOpen ?? defaultOpen);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof controlledOpen === "boolean") setOpen(controlledOpen);
  }, [controlledOpen]);

  useEffect(() => {
    if (controlledOpen !== undefined) return;
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (rootRef.current.contains(e.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [controlledOpen]);

  const toggle = () => setOpen((v) => !v);

  const rootClass = getDropdownClass(props);

  return (
    <div ref={rootRef} {...rest} className={clsx(rootClass, className)}>
      {trigger ? (
        <button
          type="button"
          onClick={toggle}
          onMouseEnter={hover ? () => setOpen(true) : undefined}
          onMouseLeave={hover ? () => setOpen(false) : undefined}
          className="dropdown-trigger"
        >
          {trigger}
        </button>
      ) : null}

      <ul
        {...(menuProps ?? {})}
        className={clsx(
          "dropdown-content",
          "menu",
          menuClassName ?? menuProps?.className,
        )}
        style={{ display: open ? undefined : "none" }}
      >
        {children}
      </ul>
    </div>
  );
};

export default Dropdown;
