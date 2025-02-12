import Header from "./components/Header";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./components/theme-provider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictMode } from "react";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/NotFound";
import Product from "./pages/Product";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import Pricing from "./pages/Pricing";

// Configure future flags for React Router v7
const routerFutureConfig = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
};

export default function App() {
  return (
    <StrictMode>
      <BrowserRouter future={routerFutureConfig}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <div className="min-h-screen ">
            <Header />

            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/product" element={<Product />} />
              <Route path="/login" element={<Login />} />
              <Route path="/app" element={<AppLayout />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>

            <Footer />
          </div>
        </ThemeProvider>
      </BrowserRouter>
    </StrictMode>
  );
}
