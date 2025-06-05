import React from "react";
import css from "./Input.module.css";
import classNames from "classnames";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange?: (value: string) => void;
}

const Input: React.FC<InputProps> = ({ onChange, ...props }) => {
  return (
    <input
      {...props}
      onChange={(e) => onChange?.(e.currentTarget.value)}
      className={classNames(css.input, props.className)}
    />
  );
};

export default Input;
