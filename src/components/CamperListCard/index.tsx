import React from "react";
import css from "./CamperListCard.module.css";
import { allCamperFeatures, type Camper } from "../../types/camper";
import Feature from "../Feature";
import Button from "../Button";
import CamperMeta from "../CamperMeta";
import HeartToggle from "../HeartToggle";
import { useNavigate } from "react-router";

const featuresMap = {
  AC: <Feature icon="wind" label="AC" />,
  bathroom: <Feature icon="shower" label="Bathroom" />,
  kitchen: <Feature icon="cup-hot" label="Kitchen" />,
  TV: <Feature icon="tv" label="TV" />,
  radio: <Feature icon="radio" label="Radio" />,
  refrigerator: <Feature icon="fridge" label="Refrigerator" />,
  microwave: <Feature icon="microwave" label="Microwave" />,
  gas: <Feature icon="gas-stove" label="Gas" />,
  water: <Feature icon="water" label="Water" />,

  petrol: <Feature icon="fuel-pump" label="Petrol" />,
  automatic: <Feature icon="diagram" label="Automatic" />,
};

interface CamperListCardProps {
  camper: Camper;
}

const CamperListCard: React.FC<CamperListCardProps> = ({ camper }) => {
  const {
    name,
    price,
    location,
    rating,
    reviews,
    description,
    gallery,
    engine,
    transmission,
  } = camper;
  const features = [];
  for (const f of allCamperFeatures) {
    if (camper[f]) {
      features.push(featuresMap[f]);
    }
  }
  if (engine === "petrol") {
    features.push(featuresMap.petrol);
  }
  if (transmission === "automatic") {
    features.push(featuresMap.automatic);
  }
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
        <div className={css.features}>{...features}</div>
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
