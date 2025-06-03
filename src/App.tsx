import { Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import DetailsPage, {
  FeaturesSection,
  ReviewsSection,
} from "./pages/DetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./components/Navbar";

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
          <Route path="/catalog/:id" element={<DetailsPage />}>
            <Route path="features" element={<FeaturesSection />} />
            <Route path="reviews" element={<ReviewsSection />} />
          </Route>
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
