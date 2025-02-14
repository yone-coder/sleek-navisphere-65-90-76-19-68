import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import Matches from "@/pages/Matches";
import NotFound from "@/pages/NotFound";
import TournamentDetails from "@/pages/TournamentDetails";
import MatchDetails from "@/pages/MatchDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "matches",
        element: <Matches />,
      },
      {
        path: "tournament/:id",
        element: <TournamentDetails />,
      },
      {
        path: "match/:id",
        element: <MatchDetails />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
