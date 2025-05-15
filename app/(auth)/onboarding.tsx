import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/ui/Button";

export default function OnboardingScreen() {
  const handleViewerLogin = () => {
    router.push("/login");
  };

  const handleScorerLogin = () => {
    router.push("/scorer-login");
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 justify-between">
        {/* Background Image with Overlay */}
        <View className="absolute inset-0">
          <Image
            source={require("../../assets/images/onboarding_bg.png")}
            style={{ width: "100%", height: "100%", resizeMode: "cover" }}
          />
          <View className="absolute inset-0 bg-black/50" />
        </View>

        {/* Content - Positioned at bottom as in Figma */}
        <View className="px-6 pb-10 mt-auto">
          {/* Logo at bottom as shown in Figma */}
          <View className="items-center mb-5">
            <View className="w-16 h-16 rounded-full bg-white items-center justify-center">
              <Image
                source={require("../../assets/images/onboarding_logo.png")}
                style={{ width: 40, height: 40, resizeMode: "contain" }}
              />
            </View>
          </View>

          <Text className="text-white text-3xl font-bold text-center mb-3">
            Stay updated with scores & highlights from the world of sports
          </Text>
          <Text className="text-gray-300 text-base text-center mb-10">
            Stay updated with live scores and exciting highlights from cricket,
            football, and racquet sports.
          </Text>

          <Button
            label="Login as Viewer"
            variant="primary"
            onPress={handleViewerLogin}
            style={{ backgroundColor: "#FF6B00", height: 56, marginBottom: 16 }}
          />

          <Button
            label="Login as Scorer"
            variant="secondary"
            onPress={handleScorerLogin}
            style={{
              backgroundColor: "transparent",
              borderColor: "#FF6B00",
              borderWidth: 1,
              height: 56,
            }}
            textStyle={{ color: "#FF6B00" }}
          />

          <View className="flex-row justify-center mt-6">
            <Text className="text-gray-400 text-sm">
              Don't have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/signup")}>
              <Text className="text-orange-500 text-sm font-medium">
                Sign up as Viewer
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center mt-2">
            <TouchableOpacity onPress={() => router.push("/scorer-signup")}>
              <Text className="text-orange-500 text-sm font-medium">
                Sign up as Scorer
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
