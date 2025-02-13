import React from "react";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";

export default function CountryList({ cities }) {
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [
        ...arr,
        { country: city.country, emoji: city.emoji, id: city.id },
      ];
    } else {
      return arr;
    }
  }, []);

  return (
    <ul className={styles.countryList}  >
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}
