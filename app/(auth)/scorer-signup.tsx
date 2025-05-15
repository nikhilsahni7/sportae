import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
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

export default function ScorerSignupScreen() {
  const { scorerSignup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone: string) => {
    const re = /^\d{10}$/;
    return re.test(phone);
  };

  const handleSignup = async () => {
    // Reset error
    setError("");

    // Validation
    if (!name || !email || !password || !confirmPassword || !phone) {
      setError("All fields are required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!validatePhone(phone)) {
      setError("Please enter a valid 10-digit phone number");
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
      // Use scorerSignup method with all the data
      await scorerSignup({
        email,
        password,
        name,
        mobileNumber: phone,
      });

      Alert.alert(
        "Signup Successful",
        "Your scorer account has been created. You can now log in.",
        [
          {
            text: "OK",
            onPress: () => router.push("/(tabs)/scorer-home"),
          },
        ]
      );
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
    router.push("/scorer-login");
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
                Scorer Registration
              </Text>
            </View>
          </View>

          {/* Content */}
          <View className="px-8 pb-10">
            <View className="w-14 h-14 bg-orange-500/20 rounded-2xl items-center justify-center mb-3">
              <Ionicons name="stopwatch-outline" size={32} color="#FF6B00" />
            </View>

            <Text className="text-white text-2xl font-bold mb-2">
              Create Scorer Account
            </Text>
            <Text className="text-gray-400 text-base mb-6">
              Join as a scorer to manage matches and record scores
            </Text>

            {/* Form */}
            <View className="space-y-4">
              {/* Name Field */}
              <View className="space-y-2">
                <Text className="text-gray-300 text-sm ml-1">Full Name</Text>
                <View className="flex-row items-center bg-gray-800/80 rounded-xl overflow-hidden border border-gray-700">
                  <View className="p-3 px-4">
                    <Ionicons name="person-outline" size={20} color="#9ca3af" />
                  </View>
                  <TextInput
                    placeholder="Enter your full name"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                    className="flex-1 p-3.5 text-white"
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </View>

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

              {/* Phone Field */}
              <View className="space-y-2">
                <Text className="text-gray-300 text-sm ml-1">Phone Number</Text>
                <View className="flex-row items-center bg-gray-800/80 rounded-xl overflow-hidden border border-gray-700">
                  <View className="p-3 px-4">
                    <Ionicons name="call-outline" size={20} color="#9ca3af" />
                  </View>
                  <TextInput
                    placeholder="Enter your phone number"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    maxLength={10}
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
                    placeholder="Create a password"
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
                <View className="bg-red-900/30 border border-red-500/30 rounded-lg p-3 mt-2">
                  <Text className="text-red-500 text-center">{error}</Text>
                </View>
              ) : null}
            </View>

            {/* Submit Button */}
            <View className="mt-8">
              <Button
                label={
                  isLoading ? "Creating Account..." : "Create Scorer Account"
                }
                variant="primary"
                onPress={handleSignup}
                isLoading={isLoading}
                style={{ height: 56 }}
              />

              <View className="flex-row justify-center items-center mt-6">
                <Text className="text-gray-400">
                  Already have a scorer account?
                </Text>
                <TouchableOpacity onPress={goToLogin}>
                  <Text className="text-orange-500 ml-1 font-medium">
                    Log In
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
