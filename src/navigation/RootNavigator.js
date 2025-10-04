import React from "react";
import AuthStack from "./AuthStack";
import MainTabs from "./MainTabs";
import SplashScreen from "../screens/SplashScreen";
import { useAuth } from "../context/AuthContext";

export default function RootNavigator() {
  const { user, loading } = useAuth();

  if (loading) return <SplashScreen />;

  return user ? <MainTabs /> : <AuthStack />;
}
