import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

export default function NavLinkComponent({ name, route }) {
  return (
    <li className="text-gray-700 dark:text-gray-200">
      <NavLink
        to={route}
        className={({ isActive }) =>
          `inline-block ${
            isActive ? "text-green-600" : ""
          } hover:text-green-600 transition-colors`
        }
      >
        {name}
      </NavLink>
    </li>
  );
}

NavLinkComponent.propTypes = {
  name: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
};
