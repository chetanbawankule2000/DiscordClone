import { FontAwesome5 } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import ChannelMemberScreen from "../screens/ChannelMemberScreen";
import ChannelScreen from "../screens/ChannelScreen";
import InviteMembersScreen from "../screens/InviteMembersScreen";
import { AntDesign } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

const ChannelStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Chat"
        component={ChannelScreen}
        options={({ navigation, route }) => ({
          title: "Chat",
          headerRight: () => (
            <MembersIcon route={route} navigation={navigation} />
          ),
          headerLeft: () => <HamburgerMenu navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="ChannelMembers"
        component={ChannelMemberScreen}
        options={{ title: "Channel Members" }}
      />
      <Stack.Screen
        name="InviteMembers"
        component={InviteMembersScreen}
        options={{ title: "Invite Members" }}
      />
    </Stack.Navigator>
  );
};

const MembersIcon = ({ route, navigation }) => {
  if (!route?.params?.channel) {
    return null;
  }
  return (
    route?.params?.channel && (
      <Pressable
        style={styles.icon}
        onPress={() =>
          navigation.navigate("ChannelMembers", {
            channel: route.params.channel,
          })
        }
      >
        <FontAwesome5 name="users" size={24} color="lightgrey" />
      </Pressable>
    )
  );
};

const HamburgerMenu = ({ navigation }) => (
  <Pressable style={styles.icon} onPress={() => navigation.openDrawer()}>
    <AntDesign name="menufold" size={24} color="lightgray" />
  </Pressable>
);

const styles = StyleSheet.create({
  icon: {
    color: "white",
    marginRight: 10,
  },
});

export default ChannelStack;
