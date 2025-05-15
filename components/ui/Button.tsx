import React from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextStyle,
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
  // Animation value for press effect
  const [pressed, setPressed] = React.useState(false);

  const getVariantStyles = (): ViewStyle => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: disabled ? "#666" : "#FF6B00",
          shadowColor: "#FF6B00",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: disabled ? 0 : 0.25,
          shadowRadius: 8,
          elevation: disabled ? 0 : 4,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        };
      case "secondary":
        return {
          backgroundColor: disabled ? "#444" : "#333",
          transform: [{ scale: pressed ? 0.98 : 1 }],
        };
      case "outline":
        return {
          backgroundColor: pressed ? "rgba(255,255,255,0.1)" : "transparent",
          borderWidth: 1.5,
          borderColor: "#FFF",
        };
      default:
        return {};
    }
  };

  const getTextColor = (): string => {
    if (disabled) return variant === "outline" ? "#999" : "#CCC";
    return variant === "outline" ||
      variant === "primary" ||
      variant === "secondary"
      ? "#FFF"
      : "#000";
  };

  const getTextStyles = (): TextStyle => {
    const baseStyle: TextStyle = {
      color: getTextColor(),
      fontWeight: "600",
      fontSize: 16,
      letterSpacing: 0.3,
    };

    switch (variant) {
      case "primary":
        return { ...baseStyle };
      case "secondary":
        return { ...baseStyle };
      case "outline":
        return { ...baseStyle };
      default:
        return baseStyle;
    }
  };

  return (
    <Pressable
      className={`py-4 rounded-xl items-center justify-center ${fullWidth ? "w-full" : ""}`}
      disabled={isLoading || disabled}
      style={[getVariantStyles(), style]}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator
          color={variant === "outline" ? "#FF6B00" : "#FFF"}
          size="small"
        />
      ) : (
        <Text className="font-semibold" style={[getTextStyles(), textStyle]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}
