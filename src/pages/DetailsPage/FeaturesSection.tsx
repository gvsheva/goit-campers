import css from "./FeaturesSection.module.css";

const FeaturesSection = () => {
  return (
    <section className={css.featuresSection}>
      <h2 className={css.title}>Features</h2>
      <ul className={css.featuresList}>
        <li className={css.featureItem}>Feature 1: User-friendly interface</li>
        <li className={css.featureItem}>Feature 2: Fast performance</li>
        <li className={css.featureItem}>Feature 3: Secure and reliable</li>
      </ul>
    </section>
  );
};

export default FeaturesSection;
