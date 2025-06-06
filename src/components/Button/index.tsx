import React from "react";
import css from "./Button.module.css";
import classNames from "classnames";
import Spinner from "../Spinner";

type Variant = "primary" | "outline";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className,
  loading,
  ...props
}) => {
  return (
    <button
      {...props}
      className={classNames(css.button, css[variant], className)}
    >
      {loading ? <Spinner className={css.spinner} /> : children}
    </button>
  );
};

export default Button;
