import React from "react";
import css from "./FilterToggleGroup.module.css";
import type { IconName } from "../../types/icon-names";
import FilterToggle from "../FilterToggle";

export interface FilterItem {
  name: string;
  label: string;
  icon: IconName;
}

interface FilterToggleGroupProps {
  title: string;
  items: FilterItem[];
  selected: string[];
  onChange: (next: string[]) => void;
}

const FilterToggleGroup: React.FC<FilterToggleGroupProps> = ({
  title,
  items,
  selected,
  onChange,
}) => {
  const toggle = (name: string) => {
    onChange(
      selected.includes(name)
        ? selected.filter((item) => item !== name)
        : [...selected, name],
    );
  };

  return (
    <div className={css.group}>
      <h3 className={css.title}>{title}</h3>
      <div className={css.list}>
        {items.map(({ icon, name, label }) => (
          <FilterToggle
            key={label}
            name={name}
            icon={icon}
            label={label}
            checked={selected.includes(name)}
            onChange={() => toggle(name)}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterToggleGroup;
