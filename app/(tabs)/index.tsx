import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { screenStyles } from "./_layout";

const { width } = Dimensions.get("window");
const cardWidth = (width - 40) / 2;


const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingBottom: 100, // Space for the tab bar
  },
});

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState("Live");
  const [activeCategory, setActiveCategory] = useState("Cricket");

  const categories = ["Cricket", "Football", "Badminton"];

  const trendingTournaments = [
    {
      id: 1,
      title: "Tata IPL 2024",
      date: "Mar 22 - May 26",
      image: require("@/assets/images/login_bg.png"),
    },
    {
      id: 2,
      title: "West Indies Tour of...",
      date: "May 13 - May 19",
      image: require("@/assets/images/login_bg.png"),
    },
  ];

  const banners = [
    {
      id: 1,
      title: "VICTORY IS NEAR",
      subtitle: "JOURNEY TO THE CHAMPIONSHIP🏆",
      date: "MATCH DAY\n11.02.2024",
      image: require("@/assets/images/login_bg.png"),
    },
    {
      id: 2,
      title: "WE FORM WINNERS",
      subtitle: "GOAL!",
      date: "",
      image: require("@/assets/images/login_bg.png"),
    },
  ];

  return (
    <SafeAreaView style={screenStyles.container}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Location and Notification Header */}
        <View className="flex-row justify-between items-center px-5 py-2">
          <View>
            <Text className="text-gray-400 text-xs">Your Location</Text>
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-white font-medium">Hyderabad, India</Text>
              <Ionicons name="chevron-down" size={16} color="white" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Greeting Section */}
        <View className="px-5 pt-2 pb-4">
          <Text className="text-white text-2xl font-bold">
            Hello, <Text className="text-yellow-400">👋</Text>
          </Text>
          <Text className="text-white text-2xl font-bold">Krishan Mishraa</Text>
        </View>

        {/* Banner Carousel */}
        <View className="px-5 mb-4">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            className="w-full"
          >
            {banners.map((banner, index) => (
              <View
                key={banner.id}
                className="mr-4 rounded-xl overflow-hidden"
                style={{ width: 340, height: 160 }}
              >
                <Image
                  source={banner.image}
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                  }}
                />
                <LinearGradient
                  colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.5)"]}
                  style={{
                    width: "100%",
                    height: "100%",
                    padding: 16,
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <View className="bg-white/20 self-start px-3 py-1 rounded-full">
                      <Image
                        source={require("@/assets/images/login_bg.png")}
                        style={{ width: 24, height: 24 }}
                        resizeMode="contain"
                      />
                    </View>
                    <Text className="text-white text-xl font-bold mt-2">
                      {banner.title}
                    </Text>
                    <Text className="text-white opacity-80">
                      {banner.subtitle}
                    </Text>
                  </View>
                  <Text className="text-white font-medium">{banner.date}</Text>
                </LinearGradient>
              </View>
            ))}
          </ScrollView>

          {/* Carousel Indicators */}
          <View className="flex-row justify-center mt-3 space-x-1">
            {banners.map((_, index) => (
              <View
                key={index}
                className={`h-2 rounded-full ${index === 0 ? "bg-orange-500 w-4" : "bg-gray-400 w-2"}`}
              />
            ))}
          </View>
        </View>

        {/* Live/Upcoming Tabs */}
        <View className="flex-row justify-center px-5 my-3">
          <View className="flex-row bg-gray-900 rounded-full p-1 w-full">
            {["Live", "Upcoming"].map((tab) => (
              <TouchableOpacity
                key={tab}
                className={`flex-1 py-3 rounded-full items-center ${activeTab === tab ? "bg-orange-500" : ""}`}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  className={`font-medium ${activeTab === tab ? "text-white" : "text-gray-400"}`}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Sports Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-5 mb-4"
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              className={`flex-row items-center mr-3 px-4 py-2 rounded-full ${
                activeCategory === category
                  ? "bg-gray-900 border border-orange-500"
                  : "bg-gray-900"
              }`}
              onPress={() => setActiveCategory(category)}
            >
              <Ionicons
                name={
                  category === "Cricket"
                    ? "tennisball-outline"
                    : category === "Football"
                      ? "football-outline"
                      : "golf-outline"
                }
                size={16}
                color={activeCategory === category ? "#FF6B00" : "white"}
                style={{ marginRight: 6 }}
              />
              <Text
                className={`${activeCategory === category ? "text-white" : "text-gray-400"} font-medium`}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Trending Tournaments */}
        <View className="px-5 mb-5">
          <View className="flex-row justify-between items-center mb-3">
            <View className="flex-row items-center">
              <Text className="text-white text-lg font-bold mr-2">
                Trending Tournaments
              </Text>
              <Ionicons name="flame" size={18} color="#FF6B00" />
            </View>
            <TouchableOpacity>
              <Text className="text-gray-400">View all</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row">
            {trendingTournaments.map((tournament, index) => (
              <TouchableOpacity
                key={tournament.id}
                className={`rounded-xl overflow-hidden ${index === 0 ? "mr-2" : "ml-2"}`}
                style={{ width: cardWidth, height: 160 }}
              >
                <Image
                  source={tournament.image}
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                  }}
                />
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.9)"]}
                  style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "flex-end",
                    padding: 10,
                  }}
                >
                  <Text className="text-white font-bold">
                    {tournament.title}
                  </Text>
                  <Text className="text-gray-300 text-xs">
                    {tournament.date}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Trending Matches */}
        <View className="px-5 mb-20">
          <View className="flex-row items-center mb-3">
            <Text className="text-white text-lg font-bold mr-2">
              Trending Matches
            </Text>
            <Ionicons name="baseball-outline" size={18} color="#FF6B00" />
          </View>

          {/* Live Match Card */}
          {activeTab === "Live" && (
            <View>
              {/* Trending Hot Bar */}
              <View className="bg-orange-500/20 self-start px-3 py-1 rounded-full mb-2 flex-row items-center">
                <Ionicons name="flame" size={14} color="#FF6B00" />
                <Text className="text-white text-xs ml-1">Trending Hot</Text>
                <Text className="text-white text-xs ml-2">31.8k Watching</Text>
              </View>

              {/* Match Info */}
              <Text className="text-white mb-3">
                IPL 2024 Match 46 | 10th Oct 2024 - 04:33 P.M.
              </Text>

              {/* Teams Section */}
              <View className="flex-row justify-between items-center mb-3">
                <View className="items-center flex-1">
                  <Image
                    source={require("@/assets/images/login_bg.png")}
                    style={{ width: 50, height: 50, borderRadius: 25 }}
                  />
                  <View className="flex-row items-center mt-2">
                    <View className="h-2 w-2 rounded-full bg-orange-500 mr-1" />
                    <Text className="text-white font-bold">RCB</Text>
                  </View>
                  <Text className="text-orange-500 font-bold text-lg">
                    195 - 6
                  </Text>
                  <Text className="text-gray-400 text-xs">(14.5)</Text>
                </View>

                <View className="items-center px-4">
                  <Ionicons name="flash" size={24} color="#FF6B00" />
                </View>

                <View className="items-center flex-1">
                  <Image
                    source={require("@/assets/images/login_bg.png")}
                    style={{ width: 50, height: 50, borderRadius: 25 }}
                  />
                  <View className="flex-row items-center mt-2">
                    <View className="h-2 w-2 rounded-full bg-gray-500 mr-1" />
                    <Text className="text-white font-bold">CSK</Text>
                  </View>
                  <Text className="text-white font-bold text-lg">233 - 10</Text>
                  <Text className="text-gray-400 text-xs">(20)</Text>
                </View>
              </View>

              <Text className="text-white text-center font-medium mb-5">
                RCB Needs 39 runs in 31 balls to win
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
