import React from "react";
import {
  ActivityIndicator,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

type ButtonVariant = "primary" | "secondary" | "outline";

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: ButtonVariant;
  isLoading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  label,
  variant = "primary",
  isLoading = false,
  fullWidth = true,
  style,
  textStyle,
  disabled,
  ...props
}: ButtonProps) {
  const getVariantStyles = (): ViewStyle => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: disabled ? "#999" : "#FF6B00",
        };
      case "secondary":
        return {
          backgroundColor: disabled ? "#555" : "#333",
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: "#FFF",
        };
      default:
        return {};
    }
  };

  const getTextColor = (): string => {
    if (disabled) return "#CCC";
    return variant === "outline" ||
      variant === "primary" ||
      variant === "secondary"
      ? "#FFF"
      : "#000";
  };

  return (
    <TouchableOpacity
      className={`py-4 rounded-full items-center justify-center ${fullWidth ? "w-full" : ""}`}
      disabled={isLoading || disabled}
      style={[getVariantStyles(), style]}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color="#FFF" />
      ) : (
        <Text
          className="font-semibold text-lg"
          style={[{ color: getTextColor() }, textStyle]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}
