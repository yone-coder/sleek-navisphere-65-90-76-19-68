
import React from "react";
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { BottomNav } from "./components/BottomNav";
import { LanguageProvider } from "./contexts/LanguageContext";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load pages
const Apps = lazy(() => import("./pages/Apps"));
const Login = lazy(() => import("./pages/Login"));
const Landing = lazy(() => import("./pages/Landing"));
const GamesPages = lazy(() => import("./pages/GamesPages"));
const ContestsPage = lazy(() => import("./pages/games/ContestsPage"));
const GamesExplore = lazy(() => import("./pages/games/GamesExplore"));
const Matches = lazy(() => import("./pages/Matches"));
const Feeds = lazy(() => import("./pages/Feeds"));
const Profile = lazy(() => import("./pages/Profile"));
const Wallet = lazy(() => import("./pages/Wallet"));
const NotFound = lazy(() => import("./pages/NotFound"));
const SignUp = lazy(() => import("./pages/SignUp"));
const NewsDetail = lazy(() => import("./pages/NewsDetail"));
const Tournaments = lazy(() => import("./pages/Tournaments"));
const TournamentDetails = lazy(() => import("./pages/TournamentDetails"));
const Gomoku = lazy(() => import("./pages/games/Gomoku"));
const Morpion = lazy(() => import("./pages/games/Morpion"));
const MorpionNewGame = lazy(() => import("./pages/games/MorpionNewGame"));
const ChessGame = lazy(() => import("./pages/games/ChessGame"));
const MatchDetails = lazy(() => import("./pages/MatchDetails"));
const Marketplace = lazy(() => import("./pages/Marketplace"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Search = lazy(() => import("./pages/Search"));
const MarketplaceSearch = lazy(() => import("./pages/MarketplaceSearch"));
const MarketplaceCategories = lazy(() => import("./pages/MarketplaceCategories"));
const MarketplaceCart = lazy(() => import("./pages/MarketplaceCart"));
const MarketplaceAccount = lazy(() => import("./pages/MarketplaceAccount"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminBanners = lazy(() => import("./pages/admin/AdminBanners"));
const AdminTournaments = lazy(() => import("./pages/admin/AdminTournaments"));
const GamesProfile = lazy(() => import("./pages/games/GamesProfile"));
const GameDetails = lazy(() => import("./pages/GameDetails"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Seminar = lazy(() => import("./pages/Seminar"));
const ShopSeller = lazy(() => import("./pages/ShopSeller"));
const Borlette = lazy(() => import("./pages/Borlette"));
const Seminars = lazy(() => import("./pages/Seminars"));
const MonCashTest = lazy(() => import("./pages/MonCashTest"));
const DepositPage = lazy(() => import("./pages/DepositPage"));
const SimpleDepositPage = lazy(() => import("./pages/SimpleDepositPage"));
const StoryPage = lazy(() => import("./components/story/StoryPage"));
const Modish = lazy(() => import("./pages/Modish"));
const ModishCheckout = lazy(() => import("./pages/ModishCheckout"));
const AppStore = lazy(() => import("./pages/AppStore"));

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const AppContent = () => {
  const location = useLocation();
  
  // Don't show bottom nav on admin routes, modish routes, or checkout routes
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isModishRoute = location.pathname.startsWith('/modish');
  const isCheckoutRoute = location.pathname.includes('checkout');
  
  // Hide bottom nav on specific routes (removing appstore from this list)
  const shouldShowBottomNav = !isAdminRoute && !isModishRoute && !isCheckoutRoute;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Apps />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/landing/:id" element={<Landing />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/games-pages" element={<GamesPages />} />
          <Route path="/games-pages/contest" element={<ContestsPage />} />
          <Route path="/games-pages/game-search" element={<GamesExplore />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/match/:id" element={<MatchDetails />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/games/*" element={<GamesPages />} />
          <Route path="/games/:id" element={<GameDetails />} />
          <Route path="/games/morpion-details" element={<GameDetails />} />
          <Route path="/games/morpion" element={<Morpion />} />
          <Route path="/games/morpion-new" element={<MorpionNewGame />} />
          <Route path="/games/gomoku" element={<Gomoku />} />
          <Route path="/games/chess" element={<ChessGame />} />
          <Route path="/games/winnr" element={<Navigate to="/games" replace />} />
          <Route path="/feeds" element={<Feeds />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/tournament/:id" element={<TournamentDetails />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/marketplace/search" element={<MarketplaceSearch />} />
          <Route path="/marketplace/categories" element={<MarketplaceCategories />} />
          <Route path="/marketplace/categories/:id" element={<MarketplaceCategories />} />
          <Route path="/marketplace/product/:id" element={<ProductDetails />} />
          <Route path="/marketplace/cart" element={<MarketplaceCart />} />
          <Route path="/marketplace/account" element={<MarketplaceAccount />} />
          <Route path="/search" element={<Search />} />
          <Route path="/seminars" element={<Seminars />} />
          <Route path="/seminar" element={<Seminar />} />
          <Route path="/seminar/:id" element={<Seminar />} />
          <Route path="/shopr-seller" element={<ShopSeller />} />
          <Route path="/borlette" element={<Borlette />} />
          <Route path="/moncash-test" element={<MonCashTest />} />
          <Route path="/deposit" element={<DepositPage />} />
          <Route path="/simple-deposit" element={<SimpleDepositPage />} />
          <Route path="/story" element={<StoryPage />} />
          
          <Route path="/modish" element={<Modish />} />
          <Route path="/modish/:id" element={<Modish />} />
          <Route path="/modish/checkout" element={<ModishCheckout />} />
          
          <Route path="/appstore" element={<AppStore />} />
          
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
          
          <Route path="/games-pages/profile" element={<GamesProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      {shouldShowBottomNav && <BottomNav />}
    </div>
  );
};

const Root = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <Toaster />
          <Sonner />
          <AppContent />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;
