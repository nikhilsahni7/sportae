import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";

export default function ProfileScreen() {
  const { user, logout, updateProfile } = useAuth();
  const [profileImage, setProfileImage] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");

  const menuItems = [
    {
      id: 1,
      title: "Edit Profile Details",
      icon: "pencil",
      color: "#FFE9D9",
      onPress: () => openEditModal(),
    },
    {
      id: 2,
      title: "Rate the App",
      icon: "star",
      color: "#FFE9D9",
      onPress: () =>
        Alert.alert("Coming Soon", "This feature will be available soon!"),
    },
    {
      id: 3,
      title: "App Settings",
      icon: "settings",
      color: "#FFE9D9",
      onPress: () =>
        Alert.alert("Coming Soon", "This feature will be available soon!"),
    },
    {
      id: 4,
      title: "Support",
      icon: "headset",
      color: "#FFE9D9",
      onPress: () =>
        Alert.alert("Coming Soon", "This feature will be available soon!"),
    },
  ];

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: async () => {
          await logout();
          router.replace("/(auth)");
        },
      },
    ]);
  };

  // Get display name from user data or show a default
  const getDisplayName = () => {
    if (user?.name) return user.name;
    if (user?.email) {
      // If we only have email, show the part before @ symbol
      return user.email.split("@")[0];
    }
    return "Sports Fan";
  };

  // Get role display text
  const getRoleText = () => {
    if (!user) return "Guest";
    if (user.role === "scorer") return "Scorer";
    return "Viewer";
  };

  // Open the edit modal
  const openEditModal = () => {
    setName(user?.name || "");
    setError("");
    setIsEditModalVisible(true);
  };

  // Save profile changes
  const saveProfileChanges = async () => {
    if (!name.trim()) {
      setError("Name cannot be empty");
      return;
    }

    setIsUpdating(true);
    setError("");

    try {
      await updateProfile({ name });
      setIsEditModalVisible(false);
      Alert.alert("Success", "Profile updated successfully!");
    } catch (err) {
      console.error("Profile update error:", err);
      setError("Failed to update profile. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 px-5">
        {/* Header */}
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-white text-lg font-semibold">Your Profile</Text>
          <TouchableOpacity className="bg-gray-800 p-2 rounded-full">
            <Ionicons name="share-social-outline" size={18} color="white" />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View className="bg-gray-900 rounded-3xl mt-6 p-6">
          <View className="items-center">
            {/* Avatar */}
            <View className="rounded-full overflow-hidden border-2 border-orange-500 p-1 mb-3">
              {user?.profilePic ? (
                <Image
                  source={{ uri: user.profilePic }}
                  style={{ width: 80, height: 80, borderRadius: 40 }}
                />
              ) : (
                <View
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    backgroundColor: "#333",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 32, color: "#FF6B00" }}>
                    {getDisplayName().charAt(0).toUpperCase()}
                  </Text>
                </View>
              )}
            </View>
            <Text className="text-white text-xl font-bold">
              {getDisplayName()}
            </Text>
            <Text className="text-orange-500 mt-1">{getRoleText()}</Text>
            {user?.email && (
              <Text className="text-gray-400 mt-1 text-sm">{user.email}</Text>
            )}
          </View>
        </View>

        {/* Menu Items */}
        <View className="mt-6 space-y-3">
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="flex-row items-center bg-gray-900 p-4 rounded-xl"
              onPress={item.onPress}
            >
              <View
                className="w-10 h-10 rounded-full items-center justify-center mr-4"
                style={{ backgroundColor: item.color }}
              >
                <Ionicons name={item.icon as any} size={18} color="#FF6B00" />
              </View>
              <Text className="text-white font-medium flex-1">
                {item.title}
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#FF6B00" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          className="flex-row items-center bg-gray-900 p-4 rounded-xl mt-6"
          onPress={handleLogout}
        >
          <View className="w-10 h-10 rounded-full items-center justify-center mr-4 bg-gray-200">
            <Ionicons name="log-out-outline" size={18} color="#FF6B00" />
          </View>
          <Text className="text-white font-medium flex-1">Logout</Text>
          <Ionicons name="chevron-forward" size={20} color="#FF6B00" />
        </TouchableOpacity>
      </View>

      {/* Edit Profile Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-gray-900 rounded-t-3xl p-6">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-white text-xl font-bold">Edit Profile</Text>
              <TouchableOpacity
                onPress={() => setIsEditModalVisible(false)}
                className="p-2"
              >
                <Ionicons name="close" size={24} color="white" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="space-y-4 mb-6">
                <Text className="text-white text-base font-medium">Name</Text>
                <TextInput
                  className="bg-gray-800 text-white p-4 rounded-lg"
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter your name"
                  placeholderTextColor="#9ca3af"
                />

                {error ? (
                  <Text className="text-red-500 text-center mt-2">{error}</Text>
                ) : null}
              </View>

              <TouchableOpacity
                className="bg-orange-500 py-4 rounded-xl items-center mb-8"
                onPress={saveProfileChanges}
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-white font-bold">Save Changes</Text>
                )}
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
