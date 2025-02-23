import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import GamesPages from "@/pages/GamesPages";
import Search from "@/pages/games/Search";
import Profile from "@/pages/games/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/games-pages",
    element: <GamesPages />,
  },
  {
    path: "/games-pages/search",
    element: <Search />
  },
  {
    path: "/games-pages/profile",
    element: <Profile />
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
