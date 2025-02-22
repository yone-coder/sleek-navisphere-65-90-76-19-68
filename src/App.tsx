
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";

import Apps from "./pages/Apps";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import MarketplaceSearch from "./pages/MarketplaceSearch";
import MarketplaceCategories from "./pages/MarketplaceCategories";
import MarketplaceCart from "./pages/MarketplaceCart";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Apps />} />
      <Route path="home" element={<Home />} />
      <Route path="/marketplace">
        <Route index element={<Marketplace />} />
        <Route path="search" element={<MarketplaceSearch />} />
        <Route path="categories" element={<MarketplaceCategories />} />
        <Route path="cart" element={<MarketplaceCart />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  );
}

export default App;
