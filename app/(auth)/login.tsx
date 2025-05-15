import { router } from "expo-router";
import { useState } from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

export default function LoginScreen() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      // Simulate login process - replace with actual login when backend is ready
      await login("user", "password");
      router.replace("/(tabs)");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
            source={require("../../assets/images/login_bg.png")}
            style={{ width: "100%", height: "100%", resizeMode: "cover" }}
          />
          <View className="absolute inset-0 bg-black/50" />
        </View>

        {/* Content - Positioned at bottom as in Figma */}
        <View className="px-6 pb-10 mt-auto space-y-4">
          <Text className="text-white text-2xl font-bold text-center mb-6">
            Are you a match official or a player?
          </Text>

          <Button
            label={isLoading ? "Logging in..." : "Login Here"}
            variant="primary"
            onPress={handleLogin}
            isLoading={isLoading}
            style={{ backgroundColor: "#FF6B00", height: 56 }}
          />

          <View className="h-5" />

          <Text className="text-white text-lg font-medium text-center mb-3">
            Are you a Scorer of the match?
          </Text>

          <Button
            label="Login as Scorer"
            variant="outline"
            onPress={handleScorerLogin}
            style={{ height: 56 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
