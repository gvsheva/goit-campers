import React from "react";
import css from "./Loading.module.css";
import classNames from "classnames";

interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {}

const Loading: React.FC<LoadingProps> = ({ className, ...props }) => {
  return (
    <div {...props} className={classNames(css.wrapper, className)}>
      <span className={css.label}>Loading</span>
      <div className={css.bar}>
        <div className={css.progress} />
      </div>
    </div>
  );
};

export default Loading;
