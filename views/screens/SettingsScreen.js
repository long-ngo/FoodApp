import {
  View,
  Text,
  Button,
  ToastAndroid,
  Image,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GoBack from '../components/GoBack';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../../redux/userSlice';
import COLORS from '../consts/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

function SettingsScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userLogin = useSelector((state) => state.user.userLogin);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <GoBack name={'Cài đặt'} navigation={navigation} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: COLORS.whiteLight,
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 10
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <View>
            {isLoggedIn ? (
              <Image
                source={{ uri: userLogin[1].image }}
                style={{ width: 80, height: 80 }}
                borderRadius={50}
              />
            ) : (
              <Ionicons name="person" size={40} />
            )}
          </View>
          <View style={{ marginLeft: 20 }}>
            <Text style={{ fontSize: 20 }}>
              {isLoggedIn ? userLogin[1].username : 'Person'}
            </Text>
          </View>
        </View>
        <View>
          <MaterialIcons name="keyboard-arrow-right" size={40} />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingVertical: 10,
          marginTop: 10,
          backgroundColor: COLORS.whiteLight
        }}
      >
        <View>
          <Text style={{ fontSize: 18 }}>Đăng xuất</Text>
        </View>

        <View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              if (isLoggedIn) {
                dispatch(removeUser());
                navigation.navigate('Home');
                ToastAndroid.show('Đăng xuất thành công', ToastAndroid.SHORT);
              }
            }}
          >
            <MaterialIcons name="logout" size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default SettingsScreen;
