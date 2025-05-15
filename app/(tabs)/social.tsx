import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SocialScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center">
        <Text className="text-black text-xl font-semibold">Social</Text>
        <Text className="text-gray-500 mt-2">Coming soon</Text>
      </View>
    </SafeAreaView>
  );
}
