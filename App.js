import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoardScreen from './views/screens/OnBoardScreen';
import DetailsScreen from './views/screens/DetailsScreen';
import BottomNavigator from './views/navigation/BottomNavigator';
import LoginScreen from './views/screens/LoginScreen';
import RegisterScreen from './views/screens/RegisterScreen';
import './firebase/config';
import { useState } from 'react';

const Stack = createNativeStackNavigator();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="OnBoard"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Group>
          <Stack.Screen name="OnBoard" component={OnBoardScreen} />
        </Stack.Group>
        {isLoggedIn ? (
          <Stack.Group>
            <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Group>
        )}
        <Stack.Group>
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
