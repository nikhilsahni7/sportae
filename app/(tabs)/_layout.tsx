import Ionicons from "@expo/vector-icons/Ionicons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Redirect, Tabs, usePathname } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";

// Component for tab button to properly handle hooks
const TabButton = ({
  route,
  isFocused,
  onPress,
  iconName,
  isMiddleTab,
}: any) => {
  // Animated values
  const scale = useSharedValue(isFocused ? 1 : 0.9);
  const opacity = useSharedValue(isFocused ? 1 : 0.6);

  // Update animation values when focus changes
  useEffect(() => {
    scale.value = withSpring(isFocused ? 1 : 0.9, {
      damping: 15,
      stiffness: 150,
    });
    opacity.value = withTiming(isFocused ? 1 : 0.6, {
      duration: 200,
    });
  }, [isFocused, scale, opacity]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      onPress={onPress}
      style={[styles.tabButton, isMiddleTab && styles.middleTabButton]}
    >
      {isMiddleTab ? (
        <Animated.View style={[styles.middleIconContainer, animatedStyle]}>
          <LinearGradient
            colors={["#FF6B00", "#FF9D00"]}
            style={styles.middleGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name={iconName} size={28} color="#FFF" />
          </LinearGradient>
        </Animated.View>
      ) : (
        <Animated.View style={animatedStyle}>
          <Ionicons
            name={iconName}
            size={24}
            color={isFocused ? "#FF6B00" : "#888"}
          />
          {isFocused && <View style={styles.indicatorDot} />}
        </Animated.View>
      )}
    </TouchableOpacity>
  );
};

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();

  // Determine if the user is a scorer
  const isScorer = user?.role === "scorer";

  // Define tabs based on role
  const tabsToShow = isScorer
    ? ["scorer-home", "chat", "profile"] // Scorer tabs
    : ["index", "search", "chat", "stats", "profile"]; // Viewer tabs

  return (
    <View
      style={[
        styles.tabBarWrapper,
        { paddingBottom: Math.max(insets.bottom, 10) },
      ]}
    >
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={styles.gradientBackground}
      >
        <BlurView intensity={25} tint="dark" style={styles.blurBackground}>
          <View style={styles.tabBarContainer}>
            {state.routes
              .filter((route: any) => tabsToShow.includes(route.name))
              .map((route: any, index: number) => {
                const { options } = descriptors[route.key];
                const label = options.title ?? route.name;
                const isFocused = state.index === index;

                const onPress = () => {
                  const event = navigation.emit({
                    type: "tabPress",
                    target: route.key,
                    canPreventDefault: true,
                  });

                  if (!isFocused && !event.defaultPrevented) {
                    navigation.navigate(route.name);
                  }
                };

                // Get the icon name based on route
                let iconName;
                if (route.name === "index" || route.name === "scorer-home") {
                  iconName = "home";
                } else if (route.name === "search") {
                  iconName = "search";
                } else if (route.name === "chat") {
                  iconName = "chatbubble";
                } else if (route.name === "stats") {
                  iconName = "stats-chart";
                } else if (route.name === "profile") {
                  iconName = "person";
                }

                // Center tab (home) gets special treatment
                const isMiddleTab =
                  route.name === "index" || route.name === "scorer-home";

                // Adjust isFocused logic to match original state index with filtered index
                const actualFocused =
                  state.routes[state.index].name === route.name;

                return (
                  <TabButton
                    key={index}
                    route={route}
                    isFocused={actualFocused}
                    onPress={onPress}
                    iconName={iconName as any}
                    isMiddleTab={isMiddleTab}
                  />
                );
              })}
          </View>
        </BlurView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    backgroundColor: "transparent",
    zIndex: 100,
  },
  gradientBackground: {
    width: "100%",
    height: 120,
    position: "absolute",
    bottom: 0,
  },
  blurBackground: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  tabBarContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(25, 25, 25, 0.75)",
    borderRadius: 30,
    height: 70,
    alignItems: "center",
    width: "90%",
    paddingHorizontal: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
    justifyContent: "space-around",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 50,
  },
  middleTabButton: {
    height: 70,
    width: 70,
    transform: [{ translateY: -10 }],
  },
  middleIconContainer: {
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FF6B00",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  middleGradient: {
    height: "100%",
    width: "100%",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  indicatorDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#FF6B00",
    marginTop: 4,
    alignSelf: "center",
  },
});

// Create a style for use in each tab screen to add bottom padding
export const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100, // Add padding for the tab bar
  },
});

export default function TabLayout() {
  const { user } = useAuth();
  const pathname = usePathname();

  // Check if user is authenticated
  if (!user) {
    return <Redirect href="/(auth)" />;
  }

  // Determine if user is a scorer
  const isScorer = user.role === "scorer";

  // Redirect to appropriate home screen based on role
  if (isScorer && pathname === "/(tabs)/index") {
    return <Redirect href="/(tabs)/scorer-home" />;
  } else if (!isScorer && pathname === "/(tabs)/scorer-home") {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { display: "none" }, // Hide the default tab bar
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      {/* Viewer-only screens */}
      {!isScorer && (
        <>
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
            }}
          />
          <Tabs.Screen
            name="search"
            options={{
              title: "Search",
            }}
          />
          <Tabs.Screen
            name="stats"
            options={{
              title: "Stats",
            }}
          />
        </>
      )}

      {/* Scorer-only screens */}
      {isScorer && (
        <Tabs.Screen
          name="scorer-home"
          options={{
            title: "Scorer Home",
          }}
        />
      )}

      {/* Common screens for both roles */}
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />

      {/* Hidden tabs (accessible but not in tab bar) */}
      <Tabs.Screen
        name="menu"
        options={{
          href: null,
          title: "Menu",
        }}
      />
      <Tabs.Screen
        name="social"
        options={{
          href: null,
          title: "Social",
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          href: null,
          title: "Analytics",
        }}
      />
      <Tabs.Screen
        name="leagues"
        options={{
          href: null,
          title: "Leagues",
        }}
      />
    </Tabs>
  );
}
