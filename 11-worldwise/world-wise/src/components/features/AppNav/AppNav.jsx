import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";

export default function AppNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink
            to="cities"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? "bg-gray-900" : ""}`
            }
          >
            Cities
          </NavLink>
        </li>
        <li>
          <NavLink
            to="countries"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? "bg-gray-900" : ""}`
            }
          >
            Countries
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
