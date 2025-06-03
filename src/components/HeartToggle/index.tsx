import React from "react";
import css from "./HeartToggle.module.css";
import Icon from "../Icon";

interface HeartToggleProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "checked" | "onChange"
  > {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const HeartToggle: React.FC<HeartToggleProps> = ({
  checked = false,
  onChange,
  ...props
}) => {
  return (
    <label className={css.toggle}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className={css.input}
        {...props}
      />
      <Icon name={checked ? "heart-pressed" : "heart"} className={css.icon} />
    </label>
  );
};

export default HeartToggle;
