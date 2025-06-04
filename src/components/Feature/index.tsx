import React from "react";
import css from "./Feature.module.css";
import Icon from "../Icon";
import type { IconName } from "../../types/icon-names";

interface FeatureProps {
  icon: IconName;
  label: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, label }) => {
  return (
    <button className={css.feature}>
      <Icon name={icon} className={css.icon} />
      <span className={css.label}>{label}</span>
    </button>
  );
};

export default Feature;
