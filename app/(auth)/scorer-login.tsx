import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/ui/Button";
import { useAuth } from "../../context/AuthContext";

export default function ScorerLoginScreen() {
  const { scorerLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setError("");
    setIsLoading(true);
    try {
      await scorerLogin(email, password);
      router.replace("/(tabs)/scorer-home");
    } catch (error) {
      console.error(error);
      setError("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const goToViewerLogin = () => {
    router.push("/login");
  };

  const handleSignup = () => {
    router.push("/scorer-signup");
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1">
          {/* Background Image with Overlay */}
          <View className="absolute inset-0">
            <Image
              source={require("../../assets/images/login_bg.png")}
              style={{ width: "100%", height: "100%", resizeMode: "cover" }}
            />
            <View className="absolute inset-0 bg-black/60" />
          </View>

          {/* Header with back button */}
          <View className="px-4 py-4 flex-row items-center">
            <TouchableOpacity
              onPress={goToViewerLogin}
              className="w-10 h-10 items-center justify-center bg-gray-800/50 rounded-full"
            >
              <Ionicons name="arrow-back" size={22} color="white" />
            </TouchableOpacity>

            <View className="items-center flex-1 pr-10">
              <Text className="text-white text-xl font-semibold">
                Scorer Login
              </Text>
            </View>
          </View>

          {/* Content */}
          <View className="px-8 pb-10 flex-1">
            {/* Top Section */}
            <View className="mb-8">
              <View className="w-14 h-14 bg-orange-500/20 rounded-2xl items-center justify-center mb-3">
                <Ionicons name="stopwatch-outline" size={32} color="#FF6B00" />
              </View>
              <Text className="text-white text-3xl font-bold">
                Scorer Portal
              </Text>
              <Text className="text-gray-400 mt-2 text-base">
                Access your scoring dashboard and manage matches
              </Text>
            </View>

            {/* Form */}
            <View className="space-y-5 mb-6">
              {/* Email Field */}
              <View className="space-y-2">
                <Text className="text-gray-300 text-sm ml-1">Email</Text>
                <View className="flex-row items-center bg-gray-800/80 rounded-xl overflow-hidden border border-gray-700">
                  <View className="p-3 px-4">
                    <Ionicons name="mail-outline" size={20} color="#9ca3af" />
                  </View>
                  <TextInput
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    className="flex-1 p-3.5 text-white"
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </View>

              {/* Password Field */}
              <View className="space-y-2">
                <Text className="text-gray-300 text-sm ml-1">Password</Text>
                <View className="flex-row items-center bg-gray-800/80 rounded-xl overflow-hidden border border-gray-700">
                  <View className="p-3 px-4">
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color="#9ca3af"
                    />
                  </View>
                  <TextInput
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    className="flex-1 p-3.5 text-white"
                    placeholderTextColor="#9ca3af"
                  />
                  <TouchableOpacity
                    className="pr-4"
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color="#9ca3af"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {error ? (
                <View className="bg-red-900/30 border border-red-500/30 rounded-lg p-3">
                  <Text className="text-red-500 text-center">{error}</Text>
                </View>
              ) : null}
            </View>

            {/* Buttons */}
            <View className="space-y-4">
              <Button
                label={isLoading ? "Logging in..." : "Login as Scorer"}
                variant="primary"
                onPress={handleLogin}
                isLoading={isLoading}
                style={{ height: 56 }}
              />

              <View className="flex-row justify-center items-center my-4">
                <Text className="text-gray-400">
                  Don&apos;t have a scorer account?
                </Text>
                <TouchableOpacity onPress={handleSignup}>
                  <Text className="text-orange-500 ml-1 font-medium">
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="flex-row items-center my-2">
                <View className="flex-1 h-[1px] bg-gray-700" />
                <Text className="text-gray-400 mx-4">OR</Text>
                <View className="flex-1 h-[1px] bg-gray-700" />
              </View>

              <Button
                label="Back to Viewer Login"
                variant="outline"
                onPress={goToViewerLogin}
                style={{ height: 56 }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
