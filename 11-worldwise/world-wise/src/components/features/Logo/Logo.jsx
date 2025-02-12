import styles from "./Logo.module.css";
import { Link } from "react-router-dom";
function Logo() {
  return (
    <Link to="/" data-aos="fade-down">
      <img src="/logo.png" alt="WorldWise logo" className={styles.logo} />
    </Link>
  );
}

export default Logo;
