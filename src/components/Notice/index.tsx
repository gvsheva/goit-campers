import React from "react";
import css from "./Notice.module.css";
import classNames from "classnames";
import {
  FaCheck,
  FaExclamationTriangle,
  FaInfo,
  FaTimesCircle,
} from "react-icons/fa";

type NoticeType = "info" | "success" | "warning" | "error";

interface NoticeProps {
  type?: NoticeType;
  children: React.ReactNode;
  className?: string;
}

const Notice: React.FC<NoticeProps> = ({
  type = "info",
  children,
  className,
}) => {
  return (
    <div className={classNames(css.notice, css[type], className)}>
      <div className={css.icon}>{ICONS[type]}</div>
      <div className={css.content}>{children}</div>
    </div>
  );
};

export default Notice;

const ICONS: Record<NoticeType, React.ReactElement> = {
  info: <FaInfo />,
  success: <FaCheck />,
  warning: <FaExclamationTriangle />,
  error: <FaTimesCircle />,
};
