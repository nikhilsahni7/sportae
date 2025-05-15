import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { LocationProvider } from "../context/LocationContext";

// Import global CSS for NativeWind
import "../global.css";

// Navigation guard to enforce authentication and redirect based on role
function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Skip if still loading
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inTabsGroup = segments[0] === "(tabs)";

    // If not authenticated and not in auth group, redirect to auth
    if (!isAuthenticated && !inAuthGroup) {
      router.replace("/(auth)");
      return;
    }

    // If authenticated but in auth group, redirect to appropriate home
    if (isAuthenticated && inAuthGroup) {
      if (user?.role === "scorer") {
        router.replace("/(tabs)/scorer-home");
      } else {
        router.replace("/(tabs)");
      }
      return;
    }

    // If authenticated and in tabs group, ensure they're in the right tab based on role
    if (isAuthenticated && inTabsGroup && segments.length > 1) {
      const currentRoute = segments[1] as string;
      const isInScorerHome = currentRoute === "scorer-home";
      // Using string literal for comparison to avoid type errors
      const isInViewerHome = currentRoute === "index";

      if (user?.role === "scorer" && isInViewerHome) {
        router.replace("/(tabs)/scorer-home");
      } else if (user?.role === "viewer" && isInScorerHome) {
        router.replace("/(tabs)");
      }
    }
  }, [isAuthenticated, isLoading, segments, user]);

  return <>{children}</>;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <AuthProvider>
      <LocationProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <AuthGuard>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="+not-found" />
            </Stack>
          </AuthGuard>
          <StatusBar style="light" />
        </ThemeProvider>
      </LocationProvider>
    </AuthProvider>
  );
}
