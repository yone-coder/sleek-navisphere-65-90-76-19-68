
import { Routes, Route } from "react-router-dom";
import ContestsPage from "./games/ContestsPage";
import GamesExplore from "./games/GamesExplore";

export default function GamesPages() {
  return (
    <Routes>
      <Route index element={<div>Games Home</div>} />
      <Route path="contest" element={<ContestsPage />} />
      <Route path="explore" element={<GamesExplore />} />
    </Routes>
  );
}
