import React from "react";
import css from "./CamperMeta.module.css";
import Icon from "../Icon";

interface CamperMetaProps {
  rating: number;
  reviewsCount: number;
  location: string;
}

const CamperMeta: React.FC<CamperMetaProps> = ({
  rating,
  reviewsCount,
  location,
}) => {
  return (
    <div className={css.meta}>
      <span className={css.item}>
        <Icon name="star-pressed" className={css.star} />
        {rating} <span className={css.muted}>({reviewsCount} Reviews)</span>
      </span>
      <span className={css.item}>
        <Icon name="map" className={css.icon} />
        {location}
      </span>
    </div>
  );
};

export default CamperMeta;
