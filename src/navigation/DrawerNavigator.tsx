import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import TabOneScreen from "../screens/TabOneScreen";
import { Linking, Text, StyleSheet, View } from "react-native";
import { ChannelList } from "stream-chat-expo";
import ChannelScreen from "../screens/ChannelScreen";
import UserListScreen from "../screens/UserListScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthContext } from "../context/AuthContext";
import { Auth } from "aws-amplify";
import { useState } from "react";
import Button from "../components/Button";
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={CustomDrawerContent}>
      <Drawer.Screen
        name="ChannelScreen"
        component={ChannelScreen}
        options={{ title: "Channel" }}
      />
      <Drawer.Screen
        name="UserList"
        component={UserListScreen}
        options={{ title: "Users" }}
      />
    </Drawer.Navigator>
  );
};

const CustomDrawerContent = (props) => {
  const { navigation } = props;
  const [tab, setTab] = useState("public");
  const onChannelSelect = (channel) => {
    // navigate to screen with channel
    navigation.navigate("ChannelScreen", { channel });
  };
  const { userId } = useAuthContext();
  const filters = { members: { $in: [userId] } };
  const publicFilters = { type: "livestream" };

  const logout = () => {
    Auth.signOut();
  };
  return (
    <SafeAreaView {...props} style={{ flex: 1 }}>
      <Text style={styles.title}>notJust Devlopment</Text>
      <View style={styles.tabs}>
        <Text
          onPress={() => setTab("public")}
          style={[
            styles.groupTitle,
            { color: tab === "public" ? "white" : "gray" },
          ]}
        >
          Public{" "}
        </Text>
        <Text
          onPress={() => setTab("private")}
          style={[
            styles.groupTitle,
            { color: tab === "private" ? "white" : "gray" },
          ]}
        >
          Private
        </Text>
      </View>
      {tab === "public" ? (
        <ChannelList
          onSelect={onChannelSelect}
          filters={publicFilters}
        ></ChannelList>
      ) : (
        <>
          <Button
            title="Stat new conversation"
            onPress={() => {
              navigation.navigate("UserList");
            }}
          />
          <ChannelList
            onSelect={onChannelSelect}
            filters={filters}
          ></ChannelList>
        </>
      )}

      <Text style={styles.logout} onPress={logout}>
        Logout
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    margin: 15,
  },
  groupTitle: {
    margin: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  logout: {
    color: "white",
    margin: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default DrawerNavigator;
