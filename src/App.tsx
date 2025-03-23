
import React from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "./contexts/LanguageContext";
import Navigation from "./navigation";

// Use platform-specific components
const App = () => {
  // Create QueryClient
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
      },
    },
  });

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <Navigation />
        </LanguageProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default App;
