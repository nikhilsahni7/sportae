import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/ui/Button";
import { useAuth } from "../../context/AuthContext";

export default function SignupScreen() {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSignup = async () => {
    // Reset error
    setError("");

    // Validation
    if (!email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      await signup(email, password);
      router.replace("/(tabs)");
    } catch (error: any) {
      console.error(error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Signup failed. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const goToLogin = () => {
    router.push("/login");
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

        {/* Header with back button */}
        <View className="px-4 py-4 flex-row items-center">
          <TouchableOpacity
            onPress={goToLogin}
            className="w-10 h-10 items-center justify-center bg-gray-800/50 rounded-full"
          >
            <Ionicons name="arrow-back" size={22} color="white" />
          </TouchableOpacity>

          <View className="items-center flex-1 pr-10">
            <Text className="text-white text-xl font-semibold">
              Create Account
            </Text>
          </View>
        </View>

        {/* Content - Positioned at bottom as in Figma */}
        <View className="px-8 pb-10 mt-auto space-y-6 w-full">
          <Text className="text-white text-2xl font-bold mb-2">Sign Up</Text>
          <Text className="text-gray-400 text-base mb-2">
            Create your account to get started
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
                  placeholder="Create your password"
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

            {/* Confirm Password Field */}
            <View className="space-y-2">
              <Text className="text-gray-300 text-sm ml-1">
                Confirm Password
              </Text>
              <View className="flex-row items-center bg-gray-800/80 rounded-xl overflow-hidden border border-gray-700">
                <View className="p-3 px-4">
                  <Ionicons
                    name="shield-checkmark-outline"
                    size={20}
                    color="#9ca3af"
                  />
                </View>
                <TextInput
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  className="flex-1 p-3.5 text-white"
                  placeholderTextColor="#9ca3af"
                />
                <TouchableOpacity
                  className="pr-4"
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Ionicons
                    name={
                      showConfirmPassword ? "eye-off-outline" : "eye-outline"
                    }
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

          <View className="mt-4 space-y-6">
            <Button
              label={isLoading ? "Creating Account..." : "Sign Up"}
              variant="primary"
              onPress={handleSignup}
              isLoading={isLoading}
              style={{ height: 56 }}
            />

            <View className="flex-row justify-center items-center">
              <Text className="text-gray-400">Already have an account?</Text>
              <TouchableOpacity onPress={goToLogin} className="py-2 px-2">
                <Text className="text-orange-500 font-medium">Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
