import React, { useState } from "react";
import css from "./BookingForm.module.css";
import * as yup from "yup";
import Input from "../Input";
import DatePicker from "../DatePicker";
import Button from "../Button";
import { useDevNullMutation } from "../../redux/api/dev-null";
import { useAppDispatch } from "../../hooks";
import { raiseNotificationWithTimeout } from "../../redux/slices";

const schema = yup.object({
  name: yup.string().required().min(1).max(100),
  email: yup.string().required().email().max(100),
  date: yup.string().required(),
  comment: yup.string().max(1000),
});

const initForm = {
  name: "",
  email: "",
  date: "",
  comment: "",
};

const initErrors = {
  name: undefined as string | undefined,
  email: undefined as string | undefined,
  date: undefined as string | undefined,
  comment: undefined as string | undefined,
} as Record<string, string | undefined>;

const BookingForm: React.FC = () => {
  const [form, setForm] = useState(initForm);
  const [errors, setErrors] = useState(initErrors);

  const handleChange = ({ name, value }: { name: string; value: string }) => {
    setForm({ ...form, [name]: value });
  };

  const dispatch = useAppDispatch();
  const [submit, { isLoading: isSubmiting }] = useDevNullMutation();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(initErrors);
    try {
      await schema.validate(form, { abortEarly: false });
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
    try {
      await submit({ data: form, failRate: 0.5 }).unwrap();
      dispatch(
        raiseNotificationWithTimeout({
          type: "success",
          message: getRandomSuccessMessage(),
        }),
      );
      setForm(initForm);
    } catch {
      dispatch(
        raiseNotificationWithTimeout({
          type: "error",
          message: getRandomErrorMessage(),
        }),
      );
    }
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

export function getRandomSuccessMessage(): string {
  const messages = [
    "Your booking has been successfully launched into the void. Fingers crossed it lands somewhere nice!",
    "We’ve sent your request to `/dev/null`. If it comes back, it was meant to be.",
    "Success! Your camper is waiting… in an alternate universe.",
    "Booking confirmed! (Well, kind of. We hope. We sent it somewhere.)",
    "Your request is now the proud occupant of a black hole. Thanks for trusting us with it.",
    "We processed your booking with 100% enthusiasm and 0% persistence.",
    "Your booking was submitted with style. Now let’s pretend it’s going somewhere.",
    "Thanks for booking! Your data now rests peacefully in `/dev/null` paradise.",
  ];

  const index = Math.floor(Math.random() * messages.length);
  return messages[index];
}

export function getRandomErrorMessage(): string {
  const messages = [
    "Oops! The booking escaped into the digital abyss.",
    "Something broke. Probably the space-time continuum.",
    "Well, that didn’t go as planned. Try sacrificing a byte to the API gods.",
    "Error 404: Your camper ran off into the wild before we could catch it.",
    "Whoops! We lost your booking somewhere between here and /dev/null.",
    "Our hamsters powering the servers took a coffee break. Please try again.",
    "It’s not you, it’s us. But mostly the server.",
    "Booking failed. But your sense of adventure is still intact!",
  ];

  const index = Math.floor(Math.random() * messages.length);
  return messages[index];
}
