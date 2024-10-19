import { SafeAreaView, Text, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchResultsScreen from "./components/SearchResultsScreen";
import add from "./components/addDocument";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SearchResultsScreen">
        <Stack.Screen
          name="SearchResultsScreen"
          component={SearchResultsScreen}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen name="add" component={add} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
