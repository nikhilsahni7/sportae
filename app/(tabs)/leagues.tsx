import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LeaguesScreen() {
  const [activeTab, setActiveTab] = useState("Active");

  const tabs = ["Active", "Ambassadors", "Completed"];

  const leagues = [
    {
      id: 1,
      name: "Belly league",
      description: "Morning workout with elements of cardio and stretching.",
      category: "All",
      started: "Aug 15, 2023",
      goal: "2 000 POINTS",
      creator: {
        name: "Princess Cole",
        role: "Creator",
        image: require("@/assets/images/login_bg.png"),
      },
      participants: [
        require("@/assets/images/login_bg.png"),
        require("@/assets/images/login_bg.png"),
        require("@/assets/images/login_bg.png"),
        require("@/assets/images/login_bg.png"),
      ],
    },
    {
      id: 2,
      name: "Fit Ninjas",
      description: "Morning workout with elements of cardio and stretching.",
      category: "All",
      participants: [
        require("@/assets/images/login_bg.png"),
        require("@/assets/images/login_bg.png"),
        require("@/assets/images/login_bg.png"),
        require("@/assets/images/login_bg.png"),
        require("@/assets/images/login_bg.png"),
      ],
    },
  ];

  const renderLeagueCard = (league: any) => {
    return (
      <View key={league.id} className="bg-white rounded-xl mb-4 p-4">
        {/* Header with creator and options */}
        <View className="flex-row items-center justify-between mb-2">
          {league.creator && (
            <View className="flex-row items-center">
              <Image
                source={league.creator.image}
                className="w-8 h-8 rounded-full mr-2"
              />
              <View>
                <Text className="font-medium text-gray-800">
                  {league.creator.name}
                </Text>
                <Text className="text-xs text-gray-500">
                  {league.creator.role}
                </Text>
              </View>
            </View>
          )}
          <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={20} color="#333" />
          </TouchableOpacity>
        </View>

        {/* League name with bookmark */}
        <View className="flex-row justify-between items-center mb-1">
          <Text className="text-lg font-bold text-gray-900">{league.name}</Text>
          <TouchableOpacity>
            <Ionicons name="bookmark-outline" size={20} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Description */}
        <View className="mb-3">
          <Text className="text-gray-700 text-sm mb-1 font-medium">
            Description:
          </Text>
          <Text className="text-gray-600 text-sm">{league.description}</Text>
        </View>

        {/* Categories */}
        <View className="mb-2">
          <Text className="text-gray-700 text-sm mb-1 font-medium">
            Categories:
          </Text>
          <Text className="text-gray-600 text-sm">{league.category}</Text>
        </View>

        {/* Started date (if available) */}
        {league.started && (
          <View className="mb-2">
            <Text className="text-gray-700 text-sm mb-1 font-medium">
              Started:
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="calendar" size={14} color="#FF6B00" />
              <Text className="text-gray-600 text-sm ml-1">
                {league.started}
              </Text>
            </View>
          </View>
        )}

        {/* Goal (if available) */}
        {league.goal && (
          <View className="mb-3">
            <Text className="text-gray-700 text-sm mb-1 font-medium">
              Goal:
            </Text>
            <Text className="text-gray-600 text-sm">{league.goal}</Text>
          </View>
        )}

        {/* Participants */}
        <View className="flex-row items-center mt-2">
          {league.participants
            .slice(0, 4)
            .map((participant: any, index: number) => (
              <Image
                key={index}
                source={participant}
                className="w-8 h-8 rounded-full"
                style={{ marginLeft: index > 0 ? -10 : 0 }}
              />
            ))}
          {league.participants.length > 4 && (
            <View className="w-8 h-8 rounded-full bg-gray-200 items-center justify-center ml-[-10]">
              <Text className="text-gray-600 text-xs">
                +{league.participants.length - 4}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="flex-1 px-4">
        {/* Header */}
        <View className="flex-row justify-between items-center py-4">
          <View className="flex-row items-center">
            <Ionicons name="trophy-outline" size={24} color="#333" />
            <Text className="text-xl font-bold text-gray-900 ml-2">
              MY LEAGUES
            </Text>
          </View>
          <View className="bg-orange-500 rounded-full w-6 h-6 items-center justify-center">
            <Text className="text-white text-xs font-bold">1</Text>
          </View>
        </View>

        {/* Tabs */}
        <View className="flex-row mb-4 bg-gray-200 rounded-full p-1">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              className={`flex-1 py-2 rounded-full items-center ${
                activeTab === tab ? "bg-white" : ""
              }`}
              onPress={() => setActiveTab(tab)}
            >
              {activeTab === tab && tab === "Active" && (
                <View className="absolute left-4 top-3 w-2 h-2 rounded-full bg-orange-500" />
              )}
              <Text
                className={`${
                  activeTab === tab
                    ? "text-gray-900 font-semibold"
                    : "text-gray-500"
                }`}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* League Cards */}
        <View className="pb-24">{leagues.map(renderLeagueCard)}</View>
      </ScrollView>
    </SafeAreaView>
  );
}
