import NavLinkComponent from "../../NavLinkComponent";
import { ModeToggle } from "../../mode-toogle";
import Logo from "../Logo/Logo";
import styles from "./PageNav.module.css";
export default function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        {/* <NavLinkComponent name="Home" route="/" /> */}

        <NavLinkComponent name="Pricing" route="/pricing" />
        <NavLinkComponent name="Product" route="/product" />
        <NavLinkComponent name="Login" route="/login" />

        {/* <NavLinkComponent name="App" route="/app" /> */}
        <ModeToggle />
      </ul>
    </nav>
  );
}
