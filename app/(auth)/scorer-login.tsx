import { router } from "expo-router";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

export default function ScorerLoginScreen() {
  const { scorerLogin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) return;

    setIsLoading(true);
    try {
      await scorerLogin(username, password);
      router.replace("/(tabs)");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
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
          <View className="absolute inset-0 bg-black/70" />
        </View>

        {/* Back Button */}
        <TouchableOpacity
          onPress={handleBack}
          className="absolute top-4 left-4 z-10 p-2"
        >
          <Text className="text-white text-lg">← Back</Text>
        </TouchableOpacity>

        {/* Content - Positioned more effectively */}
        <View className="px-6 pb-10 mt-auto space-y-4">
          <Text className="text-white text-2xl font-bold text-center mb-6">
            Login as Scorer
          </Text>

          <View className="space-y-5">
            <TextInput
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              className="bg-white/10 text-white border border-gray-500 rounded-lg p-4"
              placeholderTextColor="#999"
              style={{ height: 56 }}
            />

            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              className="bg-white/10 text-white border border-gray-500 rounded-lg p-4"
              placeholderTextColor="#999"
              style={{ height: 56 }}
            />
          </View>

          <Button
            label={isLoading ? "Logging in..." : "Login"}
            variant="primary"
            onPress={handleLogin}
            disabled={!username || !password}
            isLoading={isLoading}
            style={{
              backgroundColor: username && password ? "#FF6B00" : "#666",
              marginTop: 32,
              height: 56,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
