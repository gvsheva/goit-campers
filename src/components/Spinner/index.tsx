import classNames from "classnames";
import css from "./Spinner.module.css";
interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {}

const Spinner: React.FC<SpinnerProps> = ({ className, ...props }) => {
  return <div {...props} className={classNames(className, css.spinner)} />;
};
export default Spinner;
