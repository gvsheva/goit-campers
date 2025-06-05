import { Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import DetailsPage, {
  FeaturesSection,
  ReviewsSection,
} from "./pages/DetailsPage";
import Navbar from "./components/Navbar";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id/" element={<DetailsPage />}>
            <Route path="" element={<FeaturesSection />} index />
            <Route path="reviews" element={<ReviewsSection />} />
          </Route>
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/404" element={<ErrorPage />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
