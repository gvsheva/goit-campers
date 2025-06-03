import React from "react";
import css from "./Input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = (props) => {
  return <input className={css.input} {...props} />;
};

export default Input;
