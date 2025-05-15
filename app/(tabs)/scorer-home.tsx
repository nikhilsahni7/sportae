import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "../../context/LocationContext";
import { screenStyles } from "./_layout";

// Mock data for assigned matches
const ASSIGNED_MATCHES = [
  {
    id: "1",
    title: "IPL 2024 - Match 46",
    teams: "RCB vs CSK",
    date: "10th Oct 2024",
    time: "04:30 PM",
    venue: "M. Chinnaswamy Stadium",
    status: "upcoming",
  },
  {
    id: "2",
    title: "IPL 2024 - Match 48",
    teams: "MI vs KKR",
    date: "12th Oct 2024",
    time: "07:30 PM",
    venue: "Wankhede Stadium",
    status: "upcoming",
  },
  {
    id: "3",
    title: "IPL 2024 - Match 43",
    teams: "DC vs PBKS",
    date: "8th Oct 2024",
    time: "03:30 PM",
    venue: "Arun Jaitley Stadium",
    status: "completed",
  },
];

export default function ScorerHomeScreen() {
  const { user } = useAuth();
  const {
    address,
    loading: locationLoading,
    getCurrentLocation,
  } = useLocation();
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed">(
    "upcoming"
  );

  // Get user name - either from user object or fallback
  const getUserName = () => {
    if (user?.name) return user.name;
    if (user?.email) return user.email.split("@")[0];
    return "Scorer";
  };

  // Handle location refresh
  const handleLocationPress = () => {
    getCurrentLocation();
  };

  // Filter matches based on active tab
  const filteredMatches = ASSIGNED_MATCHES.filter(
    (match) => match.status === activeTab
  );

  // Handle start scoring for an upcoming match
  const handleStartScoring = (matchId: string) => {
    Alert.alert("Start Scoring", "Are you ready to start scoring this match?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Start",
        onPress: () => {
          // Navigate to scoring screen (to be implemented)
          console.log(`Start scoring for match ${matchId}`);
        },
      },
    ]);
  };

  // Handle view details for a completed match
  const handleViewDetails = (matchId: string) => {
    // Navigate to match details screen (to be implemented)
    console.log(`View details for match ${matchId}`);
  };

  // Render match item
  const renderMatchItem = ({
    item,
  }: {
    item: (typeof ASSIGNED_MATCHES)[0];
  }) => (
    <View className="bg-gray-800 rounded-xl p-4 mb-4">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-white font-bold text-lg">{item.title}</Text>
        <View
          className={`px-2 py-1 rounded-full ${
            item.status === "upcoming" ? "bg-green-900" : "bg-gray-600"
          }`}
        >
          <Text className="text-white text-xs capitalize">{item.status}</Text>
        </View>
      </View>

      <Text className="text-orange-500 font-medium mb-2">{item.teams}</Text>

      <View className="flex-row items-center mb-2">
        <Ionicons name="calendar-outline" size={16} color="#999" />
        <Text className="text-gray-400 ml-2">
          {item.date} | {item.time}
        </Text>
      </View>

      <View className="flex-row items-center mb-3">
        <Ionicons name="location-outline" size={16} color="#999" />
        <Text className="text-gray-400 ml-2">{item.venue}</Text>
      </View>

      {item.status === "upcoming" ? (
        <TouchableOpacity
          className="bg-orange-500 rounded-lg py-3 items-center"
          onPress={() => handleStartScoring(item.id)}
        >
          <Text className="text-white font-medium">Start Scoring</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          className="bg-gray-700 rounded-lg py-3 items-center"
          onPress={() => handleViewDetails(item.id)}
        >
          <Text className="text-white font-medium">View Details</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={screenStyles.container}>
      <View className="flex-1 px-4">
        {/* Header section */}
        <View className="flex-row justify-between items-center py-4">
          <View>
            <Text className="text-white text-2xl font-bold">
              Scorer Dashboard
            </Text>
            <TouchableOpacity
              className="flex-row items-center mt-1"
              onPress={handleLocationPress}
            >
              {locationLoading ? (
                <ActivityIndicator
                  size="small"
                  color="#FF6B00"
                  style={{ marginRight: 4 }}
                />
              ) : (
                <>
                  <Ionicons name="location-outline" size={14} color="#999" />
                  <Text className="text-gray-400 text-sm ml-1">
                    {address || "Location unavailable"}
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          <View className="items-end">
            <TouchableOpacity className="bg-gray-800 p-2 rounded-full">
              <Ionicons name="notifications-outline" size={22} color="white" />
            </TouchableOpacity>
            <Text className="text-gray-400 text-sm mt-1">
              Hi, {getUserName()}
            </Text>
          </View>
        </View>

        {/* Tab selector */}
        <View className="flex-row bg-gray-800 rounded-xl overflow-hidden mb-5 mt-3">
          <TouchableOpacity
            className={`flex-1 py-3 ${activeTab === "upcoming" ? "bg-orange-500" : ""}`}
            onPress={() => setActiveTab("upcoming")}
          >
            <Text
              className={`text-center font-medium ${
                activeTab === "upcoming" ? "text-white" : "text-gray-400"
              }`}
            >
              Upcoming Matches
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 py-3 ${activeTab === "completed" ? "bg-orange-500" : ""}`}
            onPress={() => setActiveTab("completed")}
          >
            <Text
              className={`text-center font-medium ${
                activeTab === "completed" ? "text-white" : "text-gray-400"
              }`}
            >
              Completed
            </Text>
          </TouchableOpacity>
        </View>

        {/* Match List */}
        {filteredMatches.length > 0 ? (
          <FlatList
            data={filteredMatches}
            renderItem={renderMatchItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <Ionicons name="calendar-outline" size={50} color="#555" />
            <Text className="text-white text-lg font-medium mt-4">
              No {activeTab} matches
            </Text>
            <Text className="text-gray-500 text-center mt-2 px-10">
              {activeTab === "upcoming"
                ? "You don't have any upcoming matches assigned yet."
                : "You haven't scored any matches yet."}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
