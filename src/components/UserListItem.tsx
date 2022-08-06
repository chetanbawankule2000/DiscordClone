import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";

const UserListItem = ({ user, onPress }) => {
  return (
    <Pressable style={styles.root} onPress={onPress}>
      <Image source={{ uri: user.image }} style={styles.image} />
      <Text style={styles.name}>{user.name}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  name: {
    color: "white",
    fontWeight: "bold",
  },
  image: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    margin: 10,
  },
});
export default UserListItem;
