import React from "react";
import css from "./LoaderOverlay.module.css";
import classNames from "classnames";

interface LoaderOverlayProps extends React.HTMLAttributes<HTMLDivElement> {}

const LoaderOverlay: React.FC<LoaderOverlayProps> = ({
  className,
  ...props
}) => {
  return <div {...props} className={classNames(css.overlay, className)} />;
};

export default LoaderOverlay;
