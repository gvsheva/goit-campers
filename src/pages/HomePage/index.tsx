import { useNavigate } from "react-router";
import Button from "../../components/Button";
import css from "./HomePage.module.css";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className={css.wrapper}>
      <div className={css.overlay}>
        <h1 className={css.heading}>Campers of your dreams</h1>
        <p className={css.text}>
          You can find everything you want in our catalog
        </p>
        <Button
          className={css.button}
          onClick={() => {
            navigate("/catalog");
          }}
        >
          View Now
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
