import React from "react";
import css from "./Button.module.css";

type Variant = "primary" | "outline";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: Variant;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  ...props
}) => {
  return (
    <button className={`${css.button} ${css[variant]}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
