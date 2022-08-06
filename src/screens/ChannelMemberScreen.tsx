import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import UserListItem from "../components/UserListItem";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";

const ChannelMemberScreen = () => {
  const [members, setMembers] = useState([]);
  const route = useRoute();
  const channel = route?.params?.channel;

  const navigation = useNavigation();

  const fetchMembers = async () => {
    const response = await channel.queryMembers({});
    console.log("Channel members: " + response);
    setMembers(response.members);
  };
  useEffect(() => {
    fetchMembers();
  }, [channel]);

  return (
    <FlatList
      data={members}
      keyExtractor={(item) => item.user_id}
      renderItem={({ item }) => (
        <UserListItem user={item.user} onPress={() => {}} />
      )}
      ListHeaderComponent={() => (
        <Button
          title="Invite members"
          onPress={() => navigation.navigate("InviteMembers", { channel })}
        />
      )}
    />
  );
};

export default ChannelMemberScreen;
