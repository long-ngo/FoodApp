import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../consts/colors';
import SettingsScreen from '../screens/SettingsScreen';
import FoodsScreen from '../screens/FoodsScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();

function BottomNavigator() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
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
              iconName = focused ? 'home-variant' : 'home-variant-outline';
              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={28}
                  color={color}
                />
              );
            case 'Search':
              iconName = focused ? 'search' : 'search';
              return <MaterialIcons name={iconName} size={28} color={color} />;
            case 'Category':
              iconName = focused
                ? 'circle-edit-outline'
                : 'circle-edit-outline';
              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={28}
                  color={color}
                />
              );
            case 'Settings':
              iconName = focused ? 'md-settings-sharp' : 'md-settings-outline';
              return <Ionicons name={iconName} size={28} color={color} />;
            case 'Food':
              iconName = focused ? 'create' : 'create-outline';
              return <Ionicons name={iconName} size={28} color={color} />;
            case 'Login':
              iconName = focused ? 'login' : 'login';
              return <MaterialIcons name={iconName} size={28} color={color} />;
            case 'Register':
              iconName = focused ? 'login-variant' : 'login-variant';
              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={28}
                  color={color}
                />
              );
          }
        },
        tabBarInactiveTintColor: COLORS.grey,
        tabBarActiveTintColor: COLORS.primary
      })}
    >
      <Tab.Group>
        <Tab.Screen name="Home" component={HomeScreen} />
      </Tab.Group>
      {isLoggedIn ? (
        <Tab.Group>
          <Tab.Screen name="Food" component={FoodsScreen} />
        </Tab.Group>
      ) : (
        <Tab.Group>
          <Tab.Screen name="Login" component={LoginScreen} />
        </Tab.Group>
      )}

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
                <MaterialIcons name="search" size={28} color={COLORS.primary} />
              </View>
            );
          }
        }}
      />
      {isLoggedIn ? (
        <Tab.Group>
          <Tab.Screen name="Category" component={CategoriesScreen} />
        </Tab.Group>
      ) : (
        <Tab.Group>
          <Tab.Screen name="Register" component={RegisterScreen} />
        </Tab.Group>
      )}

      <Tab.Group>
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Group>
    </Tab.Navigator>
  );
}

export default BottomNavigator;
