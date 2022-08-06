import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
  OverlayProvider,
  Chat,
  ChannelList,
  Channel,
  MessageList,
  MessageInput,
} from "stream-chat-expo";

const ChannelScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const channel = route.params?.channel;

  // navigation.setOptions({ title: channel?.data?.name || "Channel" });

  if (!channel) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Select a channel from the list from left
        </Text>
      </View>
    );
  }
  return (
    <Channel channel={channel} key={channel.data?.id}>
      <MessageList />
      <MessageInput />
    </Channel>
  );
};

export default ChannelScreen;

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  errorText: {
    color: "white",
    fontSize: 16,
  },
});
