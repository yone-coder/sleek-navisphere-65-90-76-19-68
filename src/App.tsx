import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Landing from "./pages/Landing";
import Apps from "./pages/Apps";
import Modish from "./pages/Modish";
import Marketplace from "./pages/Marketplace";
import ModishCheckout from "./pages/ModishCheckout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/apps",
    element: <Apps />,
  },
  {
    path: "/modish/:id?",
    element: <Modish />,
  },
  {
    path: "/marketplace",
    element: <Marketplace />,
  },
  {
    path: "/modish/checkout",
    element: <ModishCheckout />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
