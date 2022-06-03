import { NavigationContainer } from '@react-navigation/native';
import OnBoardScreen from '../screens/OnBoardScreen';
import DetailsScreen from '../screens/DetailsScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import BottomNavigator from './BottomNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="OnBoard"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Group>
          <Stack.Screen name="OnBoard" component={OnBoardScreen} />
          <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
        </Stack.Group>
        {isLoggedIn ? (
          <Stack.Group>
            <Stack.Screen name="Details" component={DetailsScreen} />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
