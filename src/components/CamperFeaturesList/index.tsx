import { allCamperFeatures, type Camper } from "../../types/camper";
import type { IconName } from "../../types/icon-names";
import Feature from "../Feature";
import css from "./CamperFeaturesList.module.css";

const featuresMap = {
  AC: { icon: "wind", label: "AC" },
  bathroom: { icon: "shower", label: "Bathroom" },
  kitchen: { icon: "cup-hot", label: "Kitchen" },
  TV: { icon: "tv", label: "TV" },
  radio: { icon: "radio", label: "Radio" },
  refrigerator: { icon: "fridge", label: "Refrigerator" },
  microwave: { icon: "microwave", label: "Microwave" },
  gas: { icon: "gas-stove", label: "Gas" },
  water: { icon: "water", label: "Water" },

  petrol: { icon: "fuel-pump", label: "Petrol" },
  automatic: { icon: "diagram", label: "Automatic" },
} as Record<string, { icon: IconName; label: string }>;

interface CamperFeaturesListProps {
  camper: Camper;
}

const CamperFeaturesList: React.FC<CamperFeaturesListProps> = ({ camper }) => {
  const { engine, transmission } = camper;
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
  return (
    <ul className={css.features}>
      {features.map((i) => (
        <li key={i.label}>
          <Feature label={i.label} icon={i.icon} />
        </li>
      ))}
    </ul>
  );
};

export default CamperFeaturesList;
