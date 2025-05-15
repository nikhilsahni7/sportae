import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ENDPOINTS } from "../app/constants/api";

type User = {
  id: string;
  name?: string;
  email?: string;
  role: "viewer" | "scorer" | "admin"; // Updated role names to match backend terminology
  profilePic?: string;
  nickName?: string;
  mobileNumber?: string;
  countryCode?: string;
  address?: string;
  status?: string;
  fcmToken?: string;
} | null;

// Define profile update fields based on backend
type ProfileUpdateData = {
  name?: string;
  profilePic?: string;
  status?: string;
  fcmToken?: string;
  countryCode?: string;
  address?: string;
};

// Define scorer signup data
type ScorerSignupData = {
  email: string;
  password: string;
  name?: string;
  mobileNumber?: string;
  countryCode?: string;
};

type AuthContextType = {
  user: User;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  scorerLogin: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  scorerSignup: (data: ScorerSignupData) => Promise<void>;
  updateProfile: (data: ProfileUpdateData) => Promise<void>;
};

// Storage keys for persistent data
const STORAGE_KEYS = {
  USER: "@sportae:user",
  TOKEN: "@sportae:token",
  SOCKET_TOKEN: "@sportae:socketToken",
};

const defaultValue: AuthContextType = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  scorerLogin: async () => {},
  signup: async () => {},
  scorerSignup: async () => {},
  updateProfile: async () => {},
};

const AuthContext = createContext<AuthContextType>(defaultValue);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<string | null>(null);
  const [socketToken, setSocketToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load stored authentication data on startup
  useEffect(() => {
    const loadStoredData = async () => {
      setIsLoading(true);
      try {
        const [userJson, storedToken, storedSocketToken] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.USER),
          AsyncStorage.getItem(STORAGE_KEYS.TOKEN),
          AsyncStorage.getItem(STORAGE_KEYS.SOCKET_TOKEN),
        ]);

        if (userJson && storedToken) {
          setUser(JSON.parse(userJson));
          setToken(storedToken);
          if (storedSocketToken) {
            setSocketToken(storedSocketToken);
          }
        }
      } catch (error) {
        console.error("Failed to load auth data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredData();
  }, []);

  // Configure axios interceptors when token changes
  useEffect(() => {
    if (token) {
      // Set auth headers for all requests
      axios.defaults.headers.common["token"] = token;
      if (user?.id) {
        axios.defaults.headers.common["id"] = user.id;
      }
    } else {
      // Clear auth headers when logged out
      delete axios.defaults.headers.common["token"];
      delete axios.defaults.headers.common["id"];
    }
  }, [token, user]);

  // Helper function to set auth data with proper storage
  const setAuthData = async (
    userData: User,
    authToken: string,
    socketTokenValue: string
  ) => {
    // Save everything to state
    setUser(userData);
    setToken(authToken);
    setSocketToken(socketTokenValue);

    // Save to storage
    try {
      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData)),
        AsyncStorage.setItem(STORAGE_KEYS.TOKEN, authToken),
        AsyncStorage.setItem(STORAGE_KEYS.SOCKET_TOKEN, socketTokenValue),
      ]);
    } catch (error) {
      console.error("Error saving auth data to storage:", error);
      throw new Error("Failed to save authentication data");
    }
  };

  // Viewer signup function
  const signup = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(ENDPOINTS.SIGNUP, {
        email,
        password,
      });

      if (response.status === 201) {
        // After signup, automatically log the user in
        await login(email, password);
      }
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Scorer signup function - updated to match backend expectations
  const scorerSignup = async (data: ScorerSignupData) => {
    setIsLoading(true);
    try {
      // The backend only expects email and password for signup
      const response = await axios.post(ENDPOINTS.SIGNUP, {
        email: data.email,
        password: data.password,
      });

      if (response.status === 201) {
        // After signup, automatically log in as a scorer
        await scorerLogin(data.email, data.password);
      }

      return response.data;
    } catch (error) {
      console.error("Scorer signup failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Viewer login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(ENDPOINTS.LOGIN, { email, password });

      // Extract data from response
      const {
        id,
        token: authToken,
        socketToken: newSocketToken,
        role: backendRole,
        name,
        profilePic,
        status,
        mobileNumber,
        countryCode,
        address,
      } = response.data;

      // Map backend role (0=viewer, 1=scorer) to frontend role
      let userRole: "viewer" | "scorer" | "admin" = "viewer";

      // If role is explicitly returned from backend, map it correctly
      if (backendRole === 0 || backendRole === "0") {
        userRole = "viewer";
      } else if (backendRole === 1 || backendRole === "1") {
        userRole = "scorer";
      }

      // Create user object with all available data from response
      const userData = {
        id,
        email,
        role: userRole,
        name,
        profilePic,
        status,
        mobileNumber,
        countryCode,
        address,
      };

      // Save everything to state and storage
      await setAuthData(userData, authToken, newSocketToken);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Scorer login - updated to properly set the role as scorer
  const scorerLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(ENDPOINTS.LOGIN, { email, password });

      // Extract all available data from response
      const {
        id,
        token: authToken,
        socketToken: newSocketToken,
        role: backendRole,
        name,
        profilePic,
        status,
        mobileNumber,
        countryCode,
        address,
      } = response.data;

      // Map backend role to frontend role
      let userRole: "viewer" | "scorer" | "admin" = "scorer";

      // If role is explicitly returned from backend, map it correctly
      if (backendRole === 0 || backendRole === "0") {
        userRole = "viewer";
      } else if (backendRole === 1 || backendRole === "1") {
        userRole = "scorer";
      }

      // Create scorer user object with all available data
      const userData = {
        id,
        email,
        role: userRole,
        name,
        profilePic,
        status,
        mobileNumber,
        countryCode,
        address,
      };

      // Save everything to state and storage
      await setAuthData(userData, authToken, newSocketToken);
    } catch (error) {
      console.error("Scorer login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Update profile function
  const updateProfile = async (data: ProfileUpdateData) => {
    setIsLoading(true);
    try {
      // Make sure we're authenticated
      if (!token || !user?.id) {
        throw new Error("Not authenticated");
      }

      const response = await axios.post(ENDPOINTS.EDIT_PROFILE, data);

      if (response.status === 200) {
        // Update user data with the new profile info
        const updatedUser = {
          ...user,
          ...data,
        };

        // Update state
        setUser(updatedUser);

        // Update storage
        await AsyncStorage.setItem(
          STORAGE_KEYS.USER,
          JSON.stringify(updatedUser)
        );

        return response.data;
      }
    } catch (error) {
      console.error("Profile update failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    try {
      // Clear state
      setUser(null);
      setToken(null);
      setSocketToken(null);

      // Clear storage
      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEYS.USER),
        AsyncStorage.removeItem(STORAGE_KEYS.TOKEN),
        AsyncStorage.removeItem(STORAGE_KEYS.SOCKET_TOKEN),
      ]);

      // Clear axios headers
      delete axios.defaults.headers.common["token"];
      delete axios.defaults.headers.common["id"];
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        scorerLogin,
        signup,
        scorerSignup,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
