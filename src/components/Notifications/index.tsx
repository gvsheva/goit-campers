import React from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import css from "./Notifications.module.css";
import classNames from "classnames";
import { removeNotification } from "../../redux/slices";
import { FaTimes } from "react-icons/fa";

const Notifications: React.FC = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector((state) => state.notifications);

  return (
    <div className={css.container}>
      {notifications.map(({ id, type, message }) => (
        <div key={id} className={classNames(css.notification, css[type])}>
          <span>{message}</span>
          <button
            className={css.close}
            onClick={() => dispatch(removeNotification(id!))}
            aria-label="Dismiss notification"
          >
            <FaTimes />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
