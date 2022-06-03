import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import SettingsScreen from '../screens/SettingsScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import UserScreen from '../screens/UserScreen';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();

function BottomNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { height: 50, elevation: 1 },
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home-filled' : 'home-filled';
              break;
            case 'User':
              iconName = focused ? 'person' : 'person-outline';
              break;
            case 'Search':
              iconName = focused ? 'search' : 'search';
              break;
            case 'Favorite':
              iconName = focused ? 'favorite' : 'favorite-outline';
              break;
            case 'Settings':
              iconName = focused ? 'settings' : 'settings';
              break;
          }
          return <Icon name={iconName} size={28} color={color} />;
        },
        tabBarInactiveTintColor: COLORS.grey,
        tabBarActiveTintColor: COLORS.primary
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="User" component={UserScreen} />
      <Tab.Screen
        name="Search"
        component={HomeScreen}
        options={{
          tabBarIcon: () => {
            return (
              <View
                style={{
                  backgroundColor: COLORS.white,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 60,
                  height: 60,
                  borderColor: COLORS.primary,
                  borderWidth: 2,
                  borderRadius: 30,
                  top: -20,
                  elevation: 2
                }}
              >
                <Icon name="search" size={28} color={COLORS.primary} />
              </View>
            );
          }
        }}
      />
      <Tab.Screen name="Favorite" component={FavoriteScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default BottomNavigator;
