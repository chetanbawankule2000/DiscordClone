import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useChatContext } from "stream-chat-expo";
import { useAuthContext } from "../context/AuthContext";
import { useRoute, useNavigation } from "@react-navigation/native";
import UserListItem from "../components/UserListItem";
import Button from "../components/Button";
const InviteMembersScreen = () => {
  const route = useRoute();

  const channel = route?.params?.channel;

  const navigation = useNavigation();
  const { client } = useChatContext();
  const { userId } = useAuthContext();
  const [users, setUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const fetchUser = async () => {
    const existingMembers = await channel.queryMembers({});
    const existingMembersIds = existingMembers.members.map((m) => m.user_id);

    console.log("The existingMembersIds: " + existingMembersIds);
    const response = await client.queryUsers({
      id: { $nin: existingMembersIds },
    });
    setUsers(response.users);
  };
  useEffect(() => {
    fetchUser();
  }, [channel]);

  const selectUser = (user) => {
    if (selectedUserIds.includes(user.id)) {
      setSelectedUserIds((existingUsers) =>
        existingUsers.filter((id) => id !== user.id)
      );
    } else {
      setSelectedUserIds((existingIds) => [...existingIds, user.id]);
    }
  };

  const inviteUsers = async () => {
    await channel.addMembers(selectedUserIds);
    navigation.goBack();
  };

  return (
    <FlatList
      data={users}
      renderItem={({ item }) => (
        <UserListItem
          user={item}
          onPress={() => selectUser(item)}
          isMenberSelected={selectedUserIds.includes(item.id)}
        />
      )}
      ListHeaderComponent={() =>
        !!selectedUserIds.length && (
          <Button title="Invite" onPress={inviteUsers} />
        )
      }
    />
  );
};

export default InviteMembersScreen;

const styles = StyleSheet.create({});
