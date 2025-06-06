import React, { useDeferredValue, useState } from "react";
import css from "./Image.module.css";
import classNames from "classnames";
import LoaderOverlay from "../LoaderOverlay";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const Image: React.FC<ImageProps> = ({ className, ...props }) => {
  const [loading, setLoading] = useState(true);
  const hidden = useDeferredValue(loading);

  return (
    <div className={classNames(css.wrapper)}>
      {loading && (
        <LoaderOverlay className={classNames(css.loading, className)} />
      )}
      <img
        {...props}
        className={classNames(
          css.image,
          hidden ? css.hidden : css.visible,
          className,
        )}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
      />
    </div>
  );
};

export default Image;
