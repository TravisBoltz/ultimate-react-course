import PropTypes from "prop-types";
import Spinner from "../Spinner/Spinner";
import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Message from "../Message/Message";

export default function CityList({ isLoaded, cities }) {
  if (!isLoaded) {
    return <Spinner />;
  }

  if (!cities.length) {
    return <Message message={"No cities available yet"} />;
  }
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

CityList.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      cityName: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      emoji: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
};
