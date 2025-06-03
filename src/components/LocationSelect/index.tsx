import React, { useState, useRef, useEffect } from "react";
import css from "./LocationSelect.module.css";
import Icon from "../Icon";

interface LocationSelectProps {
  options: string[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const LocationSelect: React.FC<LocationSelectProps> = ({
  options,
  value = "",
  onChange,
  placeholder = "City",
}) => {
  const [query, setQuery] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = options.filter((opt) =>
    opt.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    setQuery(val);
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div className={css.field} ref={ref}>
      <Icon name="map" className={css.icon} />
      <input
        type="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        className={css.input}
      />
      {isOpen && filtered.length > 0 && (
        <ul className={css.dropdown}>
          {filtered.map((option) => (
            <li
              key={option}
              className={css.option}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationSelect;
