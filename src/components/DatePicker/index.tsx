import React, { useState, useRef, useEffect } from "react";
import {
  format,
  isSameDay,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  addMonths,
  subMonths,
  isBefore,
  parse,
} from "date-fns";
import classNames from "classnames";
import css from "./DatePicker.module.css";
import Input from "../Input";

interface DatePickerProps extends React.ComponentProps<typeof Input> {
  value?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  className,
  onChange,
  ...props
}) => {
  const [selected, setSelected] = useState<Date | null>(
    value ? parse(value, "PPPP", new Date()) : null,
  );
  const [isOpen, setIsOpen] = useState(false);
  const [month, setMonth] = useState(new Date());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelected(value ? parse(value, "PPPP", new Date()) : null);
  }, [value]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month), { weekStartsOn: 1 }),
    end: endOfMonth(month),
  });

  const handleDateClick = (date: Date) => {
    setSelected(date);
    setIsOpen(false);
    onChange?.(format(date, "PPPP"));
  };

  return (
    <div className={classNames(css.wrapper, className)} ref={ref}>
      <Input
        {...props}
        readOnly
        className={css.input}
        value={selected ? format(selected, "PPPP") : ""}
        onFocus={() => setIsOpen(true)}
        onClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <div className={css.calendar}>
          <div className={css.header}>
            <button onClick={() => setMonth(subMonths(month, 1))}>←</button>
            <span>{format(month, "MMMM yyyy")}</span>
            <button onClick={() => setMonth(addMonths(month, 1))}>→</button>
          </div>
          <div className={css.grid}>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <div key={d} className={css.dayLabel}>
                {d}
              </div>
            ))}
            {days.map((day) => (
              <button
                key={day.toISOString()}
                className={`${css.day} ${isSameDay(day, selected || new Date()) ? css.selected : ""}`}
                disabled={isBefore(day, new Date())}
                onClick={() => handleDateClick(day)}
              >
                {day.getDate()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
