import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoardScreen from './views/screens/OnBoardScreen';
import DetailsScreen from './views/screens/DetailsScreen';
import BottomNavigator from './views/navigation/BottomNavigator';
import './firebase/config';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="OnBoard"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="OnBoard" component={OnBoardScreen} />
        <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
