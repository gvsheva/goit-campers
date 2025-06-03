import React from "react";
import css from "./Category.module.css";
import Icon from "../Icon";
import type { IconName } from "../../types/icon-names";

interface CategoryProps {
  icon: IconName;
  label: string;
}

const Category: React.FC<CategoryProps> = ({ icon, label }) => {
  return (
    <button className={css.category}>
      <Icon name={icon} className={css.icon} />
      <span className={css.label}>{label}</span>
    </button>
  );
};

export default Category;
