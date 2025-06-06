import { Route, Routes } from "react-router";
import "./App.css";
import Navbar from "./components/Navbar";
import React, { Suspense } from "react";
import Notifications from "./components/Notifications";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const CatalogPage = React.lazy(() => import("./pages/CatalogPage"));
const DetailsPage = React.lazy(() => import("./pages/DetailsPage"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));
const FeaturesSection = React.lazy(
  () => import("./pages/DetailsPage/FeaturesSection"),
);
const ReviewsSection = React.lazy(
  () => import("./pages/DetailsPage/ReviewsSection"),
);

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Suspense fallback={null}>
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
        </Suspense>
        <Notifications />
      </main>
    </>
  );
}

export default App;
