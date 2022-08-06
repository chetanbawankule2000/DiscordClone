import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { useChatContext } from "stream-chat-expo";
import { useAuthContext } from "../context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { useNavigation } from "@react-navigation/native";

const NewChannelScreen = () => {
  const navigation = useNavigation();
  const { client } = useChatContext();
  const { userId } = useAuthContext();
  const [name, setName] = useState("");
  const createChannel = async () => {
    const channel = await client.channel("team", uuidv4(), { name });
    await channel.create();
    await channel.addMembers([userId]);
    navigation.navigate("ChannelScreen", { channel });
  };
  return (
    <View style={styles.root}>
      <TextInput
        placeholder="Channel Name"
        style={styles.input}
        placeholderTextColor="lightgray"
        onChangeText={setName}
      />
      <Button title="Create channel" onPress={createChannel} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    color: "white",
  },
});

export default NewChannelScreen;
