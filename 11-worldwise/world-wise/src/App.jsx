import { StrictMode } from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import Header from "./components/Header";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./components/theme-provider";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/NotFound";
import Product from "./pages/Product";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import Pricing from "./pages/Pricing";
import CityList from "./components/features/City/CityList";
import CountryList from "./components/features/Country/CountryList";
import City from "./components/features/City/City";
import Form from "./components/features/Form/Form";
// Configure future flags for React Router v7
const routerFutureConfig = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
};

export default function App() {
  const [cities, setCities] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const fetchCities = async () => {
      try {
        const response = await fetch("http://localhost:3001/cities");
        const data = await response.json();
        setCities(data);
        console.log(cities);
        setIsLoaded(true);
      } catch (error) {
        alert(error);
      } finally {
        setIsLoaded(true);
      }
    };
    fetchCities();
  }, []);

  return (
    <StrictMode>
      <BrowserRouter future={routerFutureConfig}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <div className="min-h-screen ">
            {/* <Header /> */}
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="/product" element={<Product />} />
              <Route path="/login" element={<Login />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="*" element={<PageNotFound />} />
              <Route path="/app" element={<AppLayout />}>
                <Route index element={<Navigate replace to="cities" />}></Route>{" "}
                <Route
                  path="cities"
                  element={<CityList isLoaded={isLoaded} cities={cities} />}
                ></Route>{" "}
                <Route path="cities/:id" element={<City />} />
                <Route
                  path="countries"
                  element={<CountryList isLoaded={isLoaded} cities={cities} />}
                ></Route>
                <Route path="form" element={<Form />}></Route>
              </Route>
            </Routes>

            <Footer />
          </div>
        </ThemeProvider>
      </BrowserRouter>
    </StrictMode>
  );
}
