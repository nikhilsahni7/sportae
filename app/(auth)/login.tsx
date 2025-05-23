import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/ui/Button";
import { useAuth } from "../../context/AuthContext";

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Email validation
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogin = async () => {
    // Reset previous errors
    setError("");

    // Form validation
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);

      // Redirect to the tabs layout which will determine the correct home screen
      router.replace("/(tabs)");
    } catch (error: any) {
      console.error(error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleScorerLogin = () => {
    router.push("/scorer-login");
  };

  const handleSignup = () => {
    router.push("/signup");
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
          <View className="absolute inset-0 bg-black/60" />
        </View>

        {/* Logo or App Name - could be added here */}
        <View className="items-center mt-12">
          <Text className="text-white text-3xl font-bold">Sportae</Text>
          <View className="h-1 w-16 bg-orange-500 rounded-full mt-2" />
        </View>

        {/* Content - Positioned at bottom as in Figma */}
        <View className="px-8 pb-10 mt-auto space-y-6 w-full">
          <Text className="text-white text-2xl font-bold mb-2">Login</Text>
          <Text className="text-gray-400 text-base mb-2">
            Welcome back! Please enter your details
          </Text>

          <View className="space-y-5">
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

          <View className="mt-4 space-y-5">
            <Button
              label={isLoading ? "Logging in..." : "Login"}
              variant="primary"
              onPress={handleLogin}
              isLoading={isLoading}
              style={{ height: 56 }}
            />

            <View className="flex-row justify-center items-center mt-3">
              <Text className="text-gray-400">Don&apos;t have an account?</Text>
              <TouchableOpacity onPress={handleSignup} className="py-2 px-2">
                <Text className="text-orange-500 font-medium">Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex-row items-center my-6">
            <View className="flex-1 h-[1px] bg-gray-700" />
            <Text className="text-gray-400 mx-4">OR</Text>
            <View className="flex-1 h-[1px] bg-gray-700" />
          </View>

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
