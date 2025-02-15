
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { BottomNav } from "./components/BottomNav";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Matches from "./pages/Matches";
import Feeds from "./pages/Feeds";
import Profile from "./pages/Profile";
import Wallet from "./pages/Wallet";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NewsDetail from "./pages/NewsDetail";
import Tournaments from "./pages/Tournaments";
import TournamentDetails from "./pages/TournamentDetails";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBanners from "./pages/admin/AdminBanners";
import Games from "./pages/Games";
import Gomoku from "./pages/games/Gomoku";
import MatchDetails from "./pages/MatchDetails";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const hideHeaderRoutes = ['/login', '/signup', '/explore', '/match'];
  const isAdminRoute = location.pathname.startsWith('/admin');
  const shouldShowHeader = !hideHeaderRoutes.some(route => location.pathname.startsWith(route)) && !isAdminRoute;
  const shouldShowBottomNav = !isAdminRoute;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {shouldShowHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/match/:id" element={<MatchDetails />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/gomoku" element={<Gomoku />} />
        <Route path="/feeds" element={<Feeds />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/tournament/:id" element={<TournamentDetails />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="banners" element={<AdminBanners />} />
          <Route path="users" element={<div className="p-8">Users Management (Coming Soon)</div>} />
          <Route path="content" element={<div className="p-8">Content Management (Coming Soon)</div>} />
          <Route path="data" element={<div className="p-8">Data Management (Coming Soon)</div>} />
          <Route path="settings" element={<div className="p-8">Settings (Coming Soon)</div>} />
          <Route path="system" element={<div className="p-8">System Management (Coming Soon)</div>} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      {shouldShowBottomNav && <BottomNav />}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
