import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import AuthContextComponent from "./src/context/AuthContext";

import Navigation from "./src/navigation";
import { StreamColors } from "./src/constants/Colors";

import { StreamChat } from "stream-chat";
import { useEffect, useState } from "react";
import { OverlayProvider, Chat, DeepPartial, Theme } from "stream-chat-expo";
const API_KEY = "hu35ercbrfvx";
const client = StreamChat.getInstance(API_KEY);
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const theme: DeepPartial<Theme> = {
    colors: StreamColors,
  };

  useEffect(() => {
    // this is done when component mounts
    return () => {
      // this is done when component unmounts
      client.disconnectUser();
    };
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthContextComponent>
          <OverlayProvider value={{ style: theme }}>
            <Chat client={client}>
              <Navigation colorScheme={"dark"} />
            </Chat>
          </OverlayProvider>
          <StatusBar style="light" />
        </AuthContextComponent>
      </SafeAreaProvider>
    );
  }
}
