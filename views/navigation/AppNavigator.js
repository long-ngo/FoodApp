import { NavigationContainer } from '@react-navigation/native';
import OnBoardScreen from '../screens/OnBoardScreen';
import DetailsScreen from '../screens/DetailsScreen';
import BottomNavigator from './BottomNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="OnBoard"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Group>
          <Stack.Screen name="OnBoard" component={OnBoardScreen} />
          <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
