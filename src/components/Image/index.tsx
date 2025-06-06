import React, { useState } from "react";
import css from "./Image.module.css";
import classNames from "classnames";
import Spinner from "../Spinner";

interface ImageWithSpinnerProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {}

const Image: React.FC<ImageWithSpinnerProps> = ({ className, ...props }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className={classNames(css.wrapper)}>
      {loading && <Spinner className={css.spinner} />}
      <img
        {...props}
        className={classNames(
          css.image,
          loading ? css.hidden : css.visible,
          className,
        )}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
      />
    </div>
  );
};

export default Image;
