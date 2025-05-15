import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MenuScreen() {
  const menuOptions = [
    {
      id: 1,
      title: "Account Settings",
      icon: "person-circle-outline",
    },
    {
      id: 2,
      title: "Notifications",
      icon: "notifications-outline",
      badge: 3,
    },
    {
      id: 3,
      title: "Privacy & Security",
      icon: "shield-checkmark-outline",
    },
    {
      id: 4,
      title: "Help & Support",
      icon: "help-circle-outline",
    },
    {
      id: 5,
      title: "About",
      icon: "information-circle-outline",
    },
    {
      id: 6,
      title: "Logout",
      icon: "log-out-outline",
      isDanger: true,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4">
        <View className="py-6">
          <Text className="text-2xl font-bold text-gray-900">Menu</Text>
          <Text className="text-gray-500 mt-1">App settings and more</Text>
        </View>

        <View className="space-y-4 pb-32">
          {menuOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              className="flex-row items-center p-4 bg-gray-50 rounded-xl"
            >
              <View
                className={`w-10 h-10 rounded-full items-center justify-center mr-4 ${
                  option.isDanger ? "bg-red-100" : "bg-gray-200"
                }`}
              >
                <Ionicons
                  name={option.icon as any}
                  size={20}
                  color={option.isDanger ? "#FF3B30" : "#555"}
                />
              </View>
              <Text
                className={`flex-1 text-base font-medium ${
                  option.isDanger ? "text-red-600" : "text-gray-800"
                }`}
              >
                {option.title}
              </Text>
              {option.badge && (
                <View className="bg-orange-500 rounded-full w-6 h-6 items-center justify-center">
                  <Text className="text-white text-xs font-bold">
                    {option.badge}
                  </Text>
                </View>
              )}
              {!option.badge && !option.isDanger && (
                <Ionicons name="chevron-forward" size={20} color="#999" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
