// import Header from "./components/Header";
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
            {/* <Header /> */}
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="/product" element={<Product />} />
              <Route path="/login" element={<Login />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="*" element={<PageNotFound />} />
              <Route path="/app" element={<AppLayout />}>
                <Route index element={<p>List of Cities</p>}></Route>{" "}
                <Route path="cities" element={<p>List of Cities</p>}></Route>{" "}
                <Route path="countries" element={<p>Countries</p>}></Route>
                <Route path="form" element={<p>Form</p>}></Route>
              </Route>
            </Routes>

            <Footer />
          </div>
        </ThemeProvider>
      </BrowserRouter>
    </StrictMode>
  );
}
