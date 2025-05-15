import * as Location from "expo-location";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Alert } from "react-native";

type LocationData = {
  latitude: number;
  longitude: number;
  city?: string;
  region?: string;
  country?: string;
  formatted?: string;
};

type LocationContextType = {
  location: LocationData | null;
  address: string | null;
  loading: boolean;
  error: string | null;
  requestLocationPermission: () => Promise<void>;
  getCurrentLocation: () => Promise<void>;
};

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Request location permissions
  const requestLocationPermission = async () => {
    setLoading(true);
    setError(null);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setError("Permission to access location was denied");
        Alert.alert(
          "Location Permission Required",
          "Please enable location services to use this feature.",
          [{ text: "OK" }]
        );
        return;
      }

      await getCurrentLocation();
    } catch (err) {
      setError("Error requesting location permission");
      console.error("Error requesting permission:", err);
    } finally {
      setLoading(false);
    }
  };

  // Get current location
  const getCurrentLocation = async () => {
    setLoading(true);
    setError(null);

    try {
      const { status } = await Location.getForegroundPermissionsAsync();

      if (status !== "granted") {
        await requestLocationPermission();
        return;
      }

      const locationData = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const { latitude, longitude } = locationData.coords;

      setLocation({
        latitude,
        longitude,
      });

      // Reverse geocode to get address
      const [geocodeResult] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (geocodeResult) {
        const { city, region, country } = geocodeResult;
        setLocation((prev) => ({
          ...prev!,
          city,
          region,
          country,
          formatted: formatAddress(geocodeResult),
        }));

        setAddress(formatAddress(geocodeResult));
      }
    } catch (err) {
      setError("Error getting current location");
      console.error("Error getting location:", err);
    } finally {
      setLoading(false);
    }
  };

  // Format the address from geocode result
  const formatAddress = (geocode: Location.LocationGeocodedAddress): string => {
    const { city, district, subregion, region, country } = geocode;

    // Format in order of specificity, using only available parts
    const parts = [];

    if (city) parts.push(city);
    else if (district) parts.push(district);

    if (subregion && subregion !== city) parts.push(subregion);
    else if (region && region !== city) parts.push(region);

    if (country) parts.push(country);

    return parts.join(", ");
  };

  // Try to get location on initial load
  useEffect(() => {
    requestLocationPermission();
  }, []);

  // Provide context values
  const value = {
    location,
    address,
    loading,
    error,
    requestLocationPermission,
    getCurrentLocation,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
