import { useOutletContext } from "react-router";
import css from "./FeaturesSection.module.css";
import type { Camper, CamperType } from "../../types/camper";
import CamperFeaturesList from "../../components/CamperFeaturesList";

const Form = ({ form }: { form: CamperType }) => {
  switch (form) {
    case "alcove":
      return "Alcove";
    case "fullyIntegrated":
      return "Fully integrated";
    case "panelTruck":
      return "Panel truck";
    default:
      return "Van";
  }
};

const FeaturesSection = () => {
  const camper = useOutletContext<Camper>();
  const { form, length, width, height, tank, consumption } = camper;
  return (
    <div className={css.box}>
      <CamperFeaturesList camper={camper} />
      <div className={css.section}>
        <h4 className={css.heading}>Vehicle details</h4>
        <div className={css.details}>
          <span>Form</span>
          <span>
            <Form form={form} />
          </span>
          <span>Length</span>
          <span>{parseFloat(length)} m</span>
          <span>Width</span>
          <span>{parseFloat(width)} m</span>
          <span>Height</span>
          <span>{parseFloat(height)} m</span>
          <span>Tank</span>
          <span>{parseFloat(tank)} l</span>
          <span>Consumption</span>
          <span>{consumption}</span>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
