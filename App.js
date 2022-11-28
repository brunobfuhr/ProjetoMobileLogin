import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { ArchitectsDaughter_400Regular } from '@expo-google-fonts/architects-daughter'

import ViewNav1 from "./src/screens/ViewNav1";
import ViewTasks from "./src/screens/ViewTasks";
import ViewLogin from "./src/screens/ViewLogin";
import ViewUsers from "./src/screens/ViewUsers";


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    'inter-black': require('./src/assets/fonts/Inter-Black.ttf'),
    'inter-bold': require('./src/assets/fonts/Inter-Bold.ttf'),
    'Architects': ArchitectsDaughter_400Regular,
  });

  if(fontsLoaded) {

    return (
      <>
      <NavigationContainer>
        <Stack.Navigator 
        initialRouteName="ViewLogin"
        screenOptions={{ headerShown: true }} >
          <Stack.Screen name="ViewLogin" component={ViewLogin} />
          <Stack.Screen name="ViewUsers" component={ViewUsers} />
          <Stack.Screen name="ViewNav1" component={ViewNav1} />
          <Stack.Screen name="ViewTasks" component={ViewTasks} />

        </Stack.Navigator>
      </NavigationContainer>

      <StatusBar
        translucent={false}
        backgroundColor="#fff"
        style="auto" />
    </>
  );
} 
}