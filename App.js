import { SafeAreaView, Text, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchResultsScreen from "./screens/SearchResultsScreen";
import PropertyDetailScreen from "./screens/PropertyDetailScreen";
import FacilitiesANDServiceScreen from "./screens/FacilitiesANDServiceScreen";
import ComfirmAndPay from "./screens/ComfirmAndPay";
import DescriptionScreen from "./screens/DescriptionScreen";
import ReviewScreen from "./screens/ReviewScreen";
import LaunchScreen from "./screens/LaunchScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import PaymentSuccess from "./screens/PaymentSuccess";
import DateSelection from "./screens/DateSelectionScreen";
import GuestSelcetion from "./screens/GuestSelectionScreen";
import MapScreen from "./components/PropertyDetailScreen-MapScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LaunchScreen">
        <Stack.Screen
          name="LaunchScreen"
          component={LaunchScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignupScreen"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DateSelection"
          component={DateSelection}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GuestSelcetion"
          component={GuestSelcetion}
          options={{ headerShown: false }}
        />
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
          name="PaymentSuccess"
          component={PaymentSuccess}
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
        <Stack.Screen
          name="MapScreen"
          component={MapScreen}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen name="add" component={add} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
