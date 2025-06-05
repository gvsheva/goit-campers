import React from "react";
import css from "./CamperListCard.module.css";
import { type Camper } from "../../types/camper";
import Button from "../Button";
import CamperMeta from "../CamperMeta";
import HeartToggle from "../HeartToggle";
import { useNavigate } from "react-router";
import CamperFeaturesList from "../CamperFeaturesList";

interface CamperListCardProps {
  camper: Camper;
}

const CamperListCard: React.FC<CamperListCardProps> = ({ camper }) => {
  const { name, price, location, rating, reviews, description, gallery } =
    camper;
  const navigate = useNavigate();

  return (
    <div className={css.card}>
      <img src={gallery[0]?.thumb} alt={name} className={css.image} />
      <div className={css.content}>
        <div className={css.header}>
          <h3 className={css.title}>{name}</h3>
          <div className={css.headerRight}>
            <span className={css.price}>€{price.toFixed(2)}</span>
            <HeartToggle />
          </div>
        </div>
        <CamperMeta {...{ rating, location }} reviewsCount={reviews.length} />
        <p className={css.description}>{description}</p>
        <CamperFeaturesList camper={camper} />
        <div className={css.buttonContainer}>
          <Button
            variant="primary"
            onClick={() => {
              navigate(`${camper.id}`);
            }}
          >
            Show more
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CamperListCard;
