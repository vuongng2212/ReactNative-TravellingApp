import { SafeAreaView, Text, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchResultsScreen from "./components/SearchResultsScreen";
import PropertyDetailScreen from "./components/PropertyDetailScreen";
import FacilitiesANDServiceScreen from "./components/FacilitiesANDServiceScreen";
import ComfirmAndPay from "./components/ComfirmAndPay";
import DescriptionScreen from "./components/DescriptionScreen";
import ReviewScreen from "./components/ReviewScreen";
import LaunchScreen from "./components/LaunchScreen";
import SignupScreen from "./components/SignupScreen";
import HomeScreen from "./components/HomeScreen";
<<<<<<< HEAD
import SearchScreen from "./components/SearchScreen";

=======
import PaymentSuccess from "./components/PaymentSuccess";
>>>>>>> 78ffa8c2e06790380f1383a3dbf56a4dbb4bc4ef
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SearchResultsScreen">
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
        {/* <Stack.Screen name="add" component={add} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
