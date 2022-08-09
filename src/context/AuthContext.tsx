import { createContext, useContext, useState, useEffect } from "react";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { getStreamToken } from "../graphql/queries";
import { Alert } from "react-native";

const AuthContext = createContext({
  userId: null,
  setUserId: (newId: string) => {},
});
const AuthContextComponent = ({ children, client }) => {
  const [userId, setUserId] = useState(null);
  const [emailId, setEmailId] = useState('');
  const connectStreamChatUser = async () => {
    const userData = await Auth.currentAuthenticatedUser();
    const { sub, email } = userData.attributes;
    setEmailId(email);

    const getToken = await API.graphql(graphqlOperation(getStreamToken));
    const token = getToken?.data?.getStreamToken;
    if (!token) {
      Alert.alert("Failed to retrieve token");
    }
    console.log("The token is: " + token);
    await client.connectUser(
      {
        id: sub,
        name: email,
        image:
          "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png",
      },
      token
    );

    const channel = client.channel("livestream", "public", { name: "Public" });
    await channel.watch();
    setUserId(sub);
  };

  useEffect(() => {
    connectStreamChatUser();
  }, []);

  return (
    <AuthContext.Provider value={{ userId, setUserId,emailId }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextComponent;

export const useAuthContext = () => useContext(AuthContext);
