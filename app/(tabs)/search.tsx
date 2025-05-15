import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchScreen() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 justify-center items-center">
        <Text className="text-white text-xl font-semibold">Search Screen</Text>
        <Text className="text-gray-400 mt-2">Coming soon</Text>
      </View>
    </SafeAreaView>
  );
}
