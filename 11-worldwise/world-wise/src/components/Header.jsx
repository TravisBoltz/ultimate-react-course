import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "../components/features/mode-toogle";
import NavLinkComponent from "../components/NavLinkComponent";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 transition-all duration-300 z-50 py-4 md:py-6 
    ${
      isScrolled
        ? " dark:bg-gray-900/10 backdrop-blur-md shadow-lg"
        : "bg-transparent"
    }`}
    >
      <div className="container  text-gray-900 dark:text-gray-200 mx-auto px-4 md:px-8 flex justify-between items-center">
        <Link to="/" data-aos="fade-down" className="text-xl font-bold">
          {/* Project Name */}
          Vite Project
        </Link>

        <nav data-aos="fade-down" className="hidden md:flex space-x-6">
          <NavLinkComponent name="Home" route="/" />
          <NavLinkComponent name="Login" route="/login" />
          <NavLinkComponent name="Product" route="/product" />
          <NavLinkComponent name="Pricing" route="/pricing" />
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Header;
