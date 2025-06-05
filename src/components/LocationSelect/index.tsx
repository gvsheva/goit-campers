import React, { useState, useRef, useEffect } from "react";
import css from "./LocationSelect.module.css";
import Icon from "../Icon";

interface LocationSelectProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  options: string[];
  value?: string;
  loading?: boolean;
  onChange: (value: string) => void;
}

const LocationSelect: React.FC<LocationSelectProps> = ({
  options,
  value = "",
  loading,
  onChange,
  ...props
}) => {
  const [query, setQuery] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = options.filter((opt) =>
    opt.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    setQuery(val);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      onChange(query);
    }
  }, [isOpen]);

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
        onFocus={(e) => {
          e.currentTarget.select();
          setIsOpen(true);
        }}
        onKeyDown={(e) => {
          if (!isOpen) {
            return;
          }
          if (e.key === "Escape") {
            e.preventDefault();
            setIsOpen(false);
          }
        }}
        className={css.input}
        {...props}
      />
      {isOpen && filtered.length > 0 && (
        <ul className={css.dropdown}>
          {loading ? (
            <li className={css.loading}>Loading...</li>
          ) : (
            filtered.map((option) => (
              <li
                key={option}
                className={css.option}
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default LocationSelect;
