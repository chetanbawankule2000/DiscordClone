import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useChatContext } from "stream-chat-expo";
import UserListItem from "../components/UserListItem";
import { useAuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const UserListScreen = () => {
  const [users, setUsers] = useState([]);
  const { client } = useChatContext();
  const { userId } = useAuthContext();
  const navigation = useNavigation();
  const fetchUser = async () => {
    const response = await client.queryUsers({});
    setUsers(response.users);
    // console.log(response);
  };

  const startChannel = async (user) => {
    console.log("the user is ", user);
    const channel = client.channel("messaging", {
      members: [userId, user.id],
    });
    await channel.create();
    navigation.navigate("ChannelScreen", { channel });
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <FlatList
      data={users}
      renderItem={({ item }) => (
        <UserListItem user={item} onPress={() => startChannel(item)} />
      )}
    />
  );
};

export default UserListScreen;
