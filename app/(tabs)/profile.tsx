import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const menuItems = [
    {
      id: 1,
      title: "Edit Profile Details",
      icon: "pencil",
      color: "#FFE9D9",
    },
    {
      id: 2,
      title: "Rate the App",
      icon: "star",
      color: "#FFE9D9",
    },
    {
      id: 3,
      title: "App Settings",
      icon: "settings",
      color: "#FFE9D9",
    },
    {
      id: 4,
      title: "Support",
      icon: "headset",
      color: "#FFE9D9",
    },
  ];

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
              <Image
                source={require("@/assets/images/login_bg.png")}
                style={{ width: 80, height: 80, borderRadius: 40 }}
              />
            </View>
            <Text className="text-white text-xl font-bold">Krishan Mishra</Text>
            <Text className="text-orange-500 mt-1">Viewer</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View className="mt-6 space-y-3">
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="flex-row items-center bg-gray-900 p-4 rounded-xl"
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
        <TouchableOpacity className="flex-row items-center bg-gray-900 p-4 rounded-xl mt-6">
          <View className="w-10 h-10 rounded-full items-center justify-center mr-4 bg-gray-200">
            <Ionicons name="log-out-outline" size={18} color="#FF6B00" />
          </View>
          <Text className="text-white font-medium flex-1">Logout</Text>
          <Ionicons name="chevron-forward" size={20} color="#FF6B00" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
