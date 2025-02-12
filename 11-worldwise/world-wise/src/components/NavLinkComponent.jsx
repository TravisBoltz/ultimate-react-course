import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

export default function NavLinkComponent({ name, route }) {
  return (
    <div>
      <NavLink
        to={route}
        className={({ isActive }) =>
          `${isActive ? "text-green-600" : "text-gray-700 dark:text-gray-200"} hover:text-green-600 transition-colors`
        }
      >
        {name}
      </NavLink>
    </div>
  );
}

NavLinkComponent.propTypes = {
  name: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
};
