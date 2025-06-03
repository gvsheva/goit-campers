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
} from "date-fns";
import css from "./DatePicker.module.css";

interface DatePickerProps {
  value?: Date;
  onChange: (date: Date) => void;
  placeholder?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = "Select a date between today",
}) => {
  const [selected, setSelected] = useState<Date | null>(value || null);
  const [isOpen, setIsOpen] = useState(false);
  const [month, setMonth] = useState(new Date());
  const ref = useRef<HTMLDivElement>(null);

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
    onChange(date);
    setIsOpen(false);
  };

  return (
    <div className={css.wrapper} ref={ref}>
      <button
        className={css.input}
        onClick={() => setIsOpen(true)}
        type="button"
      >
        {selected ? format(selected, "PPP") : placeholder}
      </button>

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
