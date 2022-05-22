import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import DetailsScreen from '../screens/DetailsScreen';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();

function BottomNavigator() {
  return (
    <Tab.Navigator
      defaultScreenOptions={'Home'}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { height: 50, elevation: 0 },

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
      <Tab.Screen name="User" component={DetailsScreen} />
      <Tab.Screen
        name="Search"
        component={DetailsScreen}
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
                  top: -20
                }}
              >
                <Icon name="search" size={28} color={COLORS.primary} />
              </View>
            );
          }
        }}
      />
      <Tab.Screen name="Favorite" component={DetailsScreen} />
      <Tab.Screen name="Settings" component={HomeScreen} />
    </Tab.Navigator>
  );
}

export default BottomNavigator;
