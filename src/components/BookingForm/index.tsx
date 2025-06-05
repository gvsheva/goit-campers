import React, { useState } from "react";
import css from "./BookingForm.module.css";
import Input from "../Input";
import DatePicker from "../DatePicker";
import Button from "../Button";
import { useDevNullMutation } from "../../redux/api/dev-null";

const BookingForm: React.FC = () => {
  const empty = {
    name: "",
    email: "",
    date: "",
    comment: "",
  };
  const [form, setForm] = useState(empty);

  const handleChange = ({ name, value }: { name: string; value: string }) => {
    setForm({ ...form, [name]: value });
  };

  const [submite, { isLoading: isSubmiting }] = useDevNullMutation();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking submitted:", form);
    /* setForm(empty); */
    submite(form);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <h3 className={css.title}>Book your campervan now</h3>
      <p className={css.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <Input
        type="text"
        name="name"
        value={form.name}
        onChange={(value) => handleChange({ name: "name", value })}
        placeholder="Name*"
        required
      />

      <Input
        type="email"
        name="email"
        value={form.email}
        onChange={(value) => handleChange({ name: "email", value })}
        placeholder="Email*"
        required
      />

      <DatePicker
        name="date"
        value={form.date}
        onChange={(value) => handleChange({ name: "date", value })}
        placeholder="Booking date*"
        required
      />

      <textarea
        name="comment"
        value={form.comment}
        onChange={(e) =>
          handleChange({ name: "comment", value: e.currentTarget.value })
        }
        placeholder="Comment"
        className={css.textarea}
      />

      <Button
        className={css.button}
        type="submit"
        disabled={isSubmiting}
        loading={isSubmiting}
      >
        Send
      </Button>
    </form>
  );
};

export default BookingForm;
