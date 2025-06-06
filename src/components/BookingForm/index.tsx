import React, { useState } from "react";
import css from "./BookingForm.module.css";
import * as yup from "yup";
import Input from "../Input";
import DatePicker from "../DatePicker";
import Button from "../Button";
import { useDevNullMutation } from "../../redux/api/dev-null";

const schema = yup.object({
  name: yup.string().required().min(1).max(100),
  email: yup.string().required().email().max(100),
  date: yup.string().required(),
  comment: yup.string().max(1000),
});

const BookingForm: React.FC = () => {
  const initForm = {
    name: "",
    email: "",
    date: "",
    comment: "",
  };
  const [form, setForm] = useState(initForm);
  const initErrors = {
    name: undefined as string | undefined,
    email: undefined as string | undefined,
    date: undefined as string | undefined,
    comment: undefined as string | undefined,
  };
  const [errors, setErrors] = useState(initErrors);

  const handleChange = ({ name, value }: { name: string; value: string }) => {
    setForm({ ...form, [name]: value });
  };

  const [submit, { isLoading: isSubmiting }] = useDevNullMutation();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(initErrors);
    console.log("Booking submitted:", form);
    try {
      schema.validateSync(form, { abortEarly: false });
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setErrors({
          ...err.inner.reduce((n, e) => {
            return { ...n, [e.path!]: e.message };
          }, {}),
        });
      }
      return;
    }
    /* setForm(empty); */
    submit(form);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <h3 className={css.title}>Book your campervan now</h3>
      <p className={css.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <Input
        name="name"
        value={form.name}
        onChange={(value) => handleChange({ name: "name", value })}
        placeholder="Name*"
        error={errors.name}
      />

      <Input
        name="email"
        value={form.email}
        onChange={(value) => handleChange({ name: "email", value })}
        placeholder="Email*"
        error={errors.email}
      />

      <DatePicker
        name="date"
        value={form.date}
        onChange={(value) => handleChange({ name: "date", value })}
        placeholder="Booking date*"
        error={errors.date}
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
