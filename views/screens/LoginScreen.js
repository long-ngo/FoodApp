import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import COLORS from '../consts/colors';
import { ButtonPrimary } from '../components/ButtonPrimary';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import GoBack from '../components/GoBack';
import InputValue from '../components/InputValue';
import { useDispatch } from 'react-redux';
import { addUser } from '../../redux/userSlice';
import { getDatabase, ref, onValue } from 'firebase/database';

function LoginScreen({ route, navigation }) {
  const [activeInput, setActiveInput] = useState('');
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const dispatch = useDispatch();
  const db = getDatabase();

  useEffect(() => {
    const starCountRef = ref(db, 'users');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const dataArray = data ? Object.entries(data) : [];
      setUsers(dataArray);
    });
    return () => setUsers([]);
  }, []);

  function checkAll() {
    const userFind = users.find(
      (item) => item[1].username === username && item[1].password === password
    );

    if (!username || !password) {
      ToastAndroid.show('Hãy nhập đủ thông tin', ToastAndroid.SHORT);
      return false;
    } else if (!userFind) {
      ToastAndroid.show(
        'Tên đăng nhập hoặc mật khẩu không đúng',
        ToastAndroid.SHORT
      );
      return false;
    } else {
      return userFind;
    }
  }

  function login() {
    const user = checkAll();
    if (user) {
      dispatch(addUser(user));
      navigation.navigate({ name: 'Home' });
      ToastAndroid.show('Đăng nhập thành công!', ToastAndroid.SHORT);
    }
  }

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <GoBack name={'Đăng nhập'} navigation={navigation} />
      <View style={{ marginHorizontal: 40, marginTop: 30 }}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={{
              uri: 'https://i.pinimg.com/564x/a8/79/0f/a8790f1c75329074a58da5b2c4f85a35.jpg'
            }}
            style={{ width: 180, height: 180 }}
            resizeMode="center"
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            marginTop: 30,
            flexDirection: 'row',
            justifyContent: 'center'
          }}
        >
          <View>
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Đăng Nhập</Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                marginHorizontal: 10
              }}
            >
              /
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Register');
            }}
            activeOpacity={0.5}
          >
            <Text style={{ color: COLORS.light, fontSize: 20 }}>Đăng Ký</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 30 }}>
          <View>
            <InputValue
              name={'username'}
              activeInput={activeInput}
              placeholder="Tên đăng nhập"
              onPressIn={() => setActiveInput('username')}
              onChangeText={(text) => setUsername(text)}
              value={username}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <InputValue
              name={'password'}
              activeInput={activeInput}
              placeholder="Mật khẩu"
              onPressIn={() => setActiveInput('password')}
              onChangeText={(text) => setPassword(text)}
              type="password"
              value={password}
            />
          </View>
        </View>
        <View
          style={{
            alignItems: 'flex-end',
            marginTop: 40
          }}
        >
          <View style={{ width: 200 }}>
            <ButtonPrimary
              title={'Đăng Nhập'}
              onPress={() => {
                login();
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;
