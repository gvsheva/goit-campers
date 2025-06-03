import { NavLink } from "react-router";
import css from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={css.navbar}>
      <div className={css.logo}>
        <strong>Travel</strong>Trucks
      </div>
      <div className={css.links}>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? `${css.link} ${css.active}` : css.link
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/catalog"
          className={({ isActive }) =>
            isActive ? `${css.link} ${css.active}` : css.link
          }
        >
          Catalog
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
