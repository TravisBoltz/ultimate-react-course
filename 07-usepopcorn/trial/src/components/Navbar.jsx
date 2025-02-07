//Navbar
import Logo from "./Logo";
export default function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <title>usePopcorn</title>
      <Logo />
      {children}
    </nav>
  );
}
