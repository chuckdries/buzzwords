import React from "react";
import classNames from "classnames";
import { Button } from "react-aria-components";

export function ActionButton({
  className,
  colorClasses,
  ...props
}: React.ComponentProps<typeof Button> & { colorClasses?: string }) {
  return (
    <Button
      className={classNames(
        "cursor-default p-1 rounded border-2 block",
        className,
        colorClasses ?? 'border-slate-300 bg-slate-200 hover:bg-slate-100 '
      )}
      {...props}
    />
  );
}
