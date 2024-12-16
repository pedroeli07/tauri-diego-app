// src/components/Blink.tsx
import React from "react";
import clsx from "clsx";

interface BlinkProps {
  children: React.ReactNode;
  className?: string;
}

const Blink: React.FC<BlinkProps> = ({ children, className }) => {
  return (
    <span className={clsx("animate-subtle-blink", className)}>
      {children}
    </span>
  );
};

export default Blink;
