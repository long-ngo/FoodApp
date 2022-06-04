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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const db = getDatabase();

  useEffect(() => {
    const starCountRef = ref(db, 'users');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const dataArray = Object.entries(data);
      setUsers(dataArray);
    });
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <GoBack name={'Login'} navigation={navigation} />
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
            <Text style={{ fontSize: 35, fontWeight: 'bold' }}>Login</Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 35,
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
            <Text style={{ color: COLORS.light, fontSize: 20 }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 30 }}>
          <View>
            <InputValue
              name={'username'}
              activeInput={activeInput}
              placeholder="Username"
              onPressIn={() => setActiveInput('username')}
              onChangeText={(text) => setUsername(text)}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <InputValue
              name={'password'}
              activeInput={activeInput}
              placeholder="Password"
              onPressIn={() => setActiveInput('password')}
              onChangeText={(text) => setPassword(text)}
              type="password"
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
              title={'Login'}
              onPress={() => {
                const user = users.find(
                  (item) =>
                    item[1].username === username &&
                    item[1].password == password
                );
                if (user) {
                  ToastAndroid.show('Login successful!', ToastAndroid.SHORT);
                  dispatch(addUser(user));
                  navigation.navigate({ name: 'Home' });
                } else {
                  ToastAndroid.show('Login false!', ToastAndroid.SHORT);
                }
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;
