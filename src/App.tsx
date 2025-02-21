
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { BottomNav } from "./components/BottomNav";
import { LanguageProvider } from "./contexts/LanguageContext";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load all pages
const Home = lazy(() => import("./pages/Home"));
const Explore = lazy(() => import("./pages/Explore"));
const Matches = lazy(() => import("./pages/Matches"));
const Feeds = lazy(() => import("./pages/Feeds"));
const Profile = lazy(() => import("./pages/Profile"));
const Wallet = lazy(() => import("./pages/Wallet"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const NewsDetail = lazy(() => import("./pages/NewsDetail"));
const Tournaments = lazy(() => import("./pages/Tournaments"));
const TournamentDetails = lazy(() => import("./pages/TournamentDetails"));
const Games = lazy(() => import("./pages/Games"));
const Gomoku = lazy(() => import("./pages/games/Gomoku"));
const Morpion = lazy(() => import("./pages/games/Morpion"));
const MatchDetails = lazy(() => import("./pages/MatchDetails"));
const Marketplace = lazy(() => import("./pages/Marketplace"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Apps = lazy(() => import("./pages/Apps"));
const Search = lazy(() => import("./pages/Search"));

// Lazy load admin pages
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminBanners = lazy(() => import("./pages/admin/AdminBanners"));
const AdminTournaments = lazy(() => import("./pages/admin/AdminTournaments"));

const LoadingFallback = () => (
  <div className="min-h-screen p-8 space-y-4">
    <Skeleton className="h-8 w-[250px]" />
    <div className="space-y-4">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-[90%]" />
      <Skeleton className="h-4 w-[80%]" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Skeleton className="h-[200px] w-full rounded-lg" />
      <Skeleton className="h-[200px] w-full rounded-lg" />
      <Skeleton className="h-[200px] w-full rounded-lg" />
    </div>
  </div>
);

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const hideHeaderRoutes = ['/login', '/signup', '/explore', '/match', '/games/morpion', '/marketplace', '/apps', '/search'];
  const hideBottomNavRoutes = ['/marketplace'];
  const isAdminRoute = location.pathname.startsWith('/admin');
  const shouldShowHeader = !hideHeaderRoutes.some(route => location.pathname.startsWith(route)) && !isAdminRoute;
  const shouldShowBottomNav = !isAdminRoute && !hideBottomNavRoutes.some(route => location.pathname.startsWith(route));

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {shouldShowHeader && <Header />}
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/match/:id" element={<MatchDetails />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/gomoku" element={<Gomoku />} />
          <Route path="/games/morpion" element={<Morpion />} />
          <Route path="/feeds" element={<Feeds />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/tournament/:id" element={<TournamentDetails />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/marketplace/product/:id" element={<ProductDetails />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/search" element={<Search />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="banners" element={<AdminBanners />} />
            <Route path="tournaments" element={<AdminTournaments />} />
            <Route path="users" element={<div className="p-8">Users Management (Coming Soon)</div>} />
            <Route path="content" element={<div className="p-8">Content Management (Coming Soon)</div>} />
            <Route path="data" element={<div className="p-8">Data Management (Coming Soon)</div>} />
            <Route path="settings" element={<div className="p-8">Settings (Coming Soon)</div>} />
            <Route path="system" element={<div className="p-8">System Management (Coming Soon)</div>} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
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
