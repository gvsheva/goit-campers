import React from "react";
import css from "./Loader.module.css";
import Spinner from "../Spinner";

interface LoaderProps {
  loading: boolean;
  children: React.ReactNode;
}

const Loader: React.FC<LoaderProps> = ({ loading, children }) => {
  if (loading) {
    return (
      <div className={css.wrapper}>
        <Spinner className={css.spinner} />
      </div>
    );
  }

  return <>{children}</>;
};

export default Loader;
