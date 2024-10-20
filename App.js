import { SafeAreaView, Text, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchResultsScreen from "./components/SearchResultsScreen";
import PropertyDetailScreen from "./components/PropertyDetailScreen";
import FacilitiesANDServiceScreen from "./components/FacilitiesANDServiceScreen";
import ComfirmAndPay from "./components/ComfirmAndPay";
import DescriptionScreen from "./components/DescriptionScreen";
import ReviewScreen from "./components/ReviewScreen";

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
        <Stack.Screen
          name="PropertyDetailScreen"
          component={PropertyDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FacilitiesANDServiceScreen"
          component={FacilitiesANDServiceScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ComfirmAndPay"
          component={ComfirmAndPay}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DescriptionScreen"
          component={DescriptionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ReviewScreen"
          component={ReviewScreen}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen name="add" component={add} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
