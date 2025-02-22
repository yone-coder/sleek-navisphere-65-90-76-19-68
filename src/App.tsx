import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import RootLayout from "@/layouts/RootLayout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import Pricing from "@/pages/Pricing";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import DashboardLayout from "@/layouts/DashboardLayout";
import DashboardHome from "@/pages/dashboard/DashboardHome";
import DashboardSettings from "@/pages/dashboard/DashboardSettings";
import DashboardAnalytics from "@/pages/dashboard/DashboardAnalytics";
import Marketplace from "@/pages/Marketplace";
import MarketplaceSearch from "@/pages/MarketplaceSearch";
import MarketplaceCategories from "@/pages/MarketplaceCategories";
import Profile from "@/pages/Profile";
import Checkout from "@/pages/Checkout";
import MarketplaceCart from "@/pages/MarketplaceCart";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="profile" element={<Profile />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="settings" element={<DashboardSettings />} />
        <Route path="analytics" element={<DashboardAnalytics />} />
      </Route>
      <Route
        path="/marketplace"
        element={<RootLayout />}
      >
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
    <RouterProvider router={router} />
  );
}

export default App;
