import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import COLORS from '../consts/colors';
import { ButtonPrimary } from '../components/ButtonPrimary';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import GoBack from '../components/GoBack';
import InputValue from '../components/InputValue';

function RegisterScreen({ route, navigation }) {
  const [activeInput, setActiveInput] = useState('');
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <GoBack name={'Sign Up'} navigation={navigation} />
      <View style={{ marginHorizontal: 40, marginTop: 30 }}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={{
              uri: 'https://i.pinimg.com/736x/19/be/9b/19be9b99ddc6ad8b4371f4f80990a457.jpg'
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
            <Text style={{ fontSize: 35, fontWeight: 'bold' }}>Sign Up</Text>
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
              navigation.navigate('Login');
            }}
            activeOpacity={0.5}
          >
            <Text style={{ color: COLORS.light, fontSize: 20 }}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 30 }}>
          <View>
            <InputValue
              name="username"
              activeInput={activeInput}
              placeholder="Username"
              onPressIn={() => setActiveInput('username')}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <InputValue
              name="password"
              activeInput={activeInput}
              placeholder="Password"
              type="password"
              onPressIn={() => setActiveInput('password')}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <InputValue
              name="confirm"
              activeInput={activeInput}
              placeholder="Re-inter password"
              type="password"
              onPressIn={() => setActiveInput('confirm')}
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
            <ButtonPrimary title={'Sign Up'} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default RegisterScreen;
