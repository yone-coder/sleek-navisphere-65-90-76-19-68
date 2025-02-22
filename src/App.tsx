
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Marketplace from "./pages/Marketplace";
import MarketplaceSearch from "./pages/MarketplaceSearch";
import MarketplaceCategories from "./pages/MarketplaceCategories";
import MarketplaceCart from "./pages/MarketplaceCart";
import { LanguageProvider } from "./contexts/LanguageContext";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
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

