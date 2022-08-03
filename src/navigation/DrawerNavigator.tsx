import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import TabOneScreen from "../screens/TabOneScreen";
import { Linking, Text, StyleSheet } from "react-native";
import { ChannelList } from "stream-chat-expo";
import ChannelScreen from "../screens/ChannelScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthContext } from "../context/AuthContext";
import { Auth } from "aws-amplify";
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={CustomDrawerContent}>
      <Drawer.Screen
        name="ChannelScreen"
        component={ChannelScreen}
        options={{ title: "Channel" }}
      />
    </Drawer.Navigator>
  );
};

const CustomDrawerContent = (props) => {
  const onChannelSelect = (channel) => {
    // navigate to screen with channel
    props.navigation.navigate("ChannelScreen", { channel });
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
      <Text style={styles.title}>PUblic Channels</Text>
      <ChannelList
        onSelect={onChannelSelect}
        filters={publicFilters}
      ></ChannelList>
      <Text style={styles.title}>Your Channel</Text>
      <ChannelList onSelect={onChannelSelect} filters={filters}></ChannelList>
      <Text
        style={{ color: "white", margin: 10, fontWeight: "bold" }}
        onPress={logout}
      >
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
    color: "white",
    margin: 10,
  },
});

export default DrawerNavigator;
