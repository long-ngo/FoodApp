import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  ToastAndroid
} from 'react-native';
import COLORS from '../consts/colors';
import { ButtonPrimary } from '../components/ButtonPrimary';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import GoBack from '../components/GoBack';
import InputValue from '../components/InputValue';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import { uploadImage } from '../../firebase/upload';
import { ref, getDatabase, set, push, onValue } from 'firebase/database';

function RegisterScreen({ route, navigation }) {
  const [users, setUsers] = useState([]);
  const [activeInput, setActiveInput] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [imageSource, setImageSource] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const database = getDatabase();

  useEffect(() => {
    const starCountRef = ref(database, 'users');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const dataArray = data ? Object.entries(data) : [];
      setUsers(dataArray);
    });
    return () => {
      setUsers([]);
      setUsername(null);
      setPassword(null);
      setConfirm(null);
      setImageSource(null);
      setIsLoading(null);
      setActiveInput(null);
    };
  }, []);

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1
    });

    if (!result.cancelled) {
      setImageSource(result.uri);
    }
  }

  function writeUserData(username, password, image) {
    const userRef = push(ref(database, 'users'));
    set(userRef, {
      username: username,
      password: password,
      image: image
    })
      .then(() => {
        setIsLoading(false);
        ToastAndroid.show('T???o t??i kho???n th??nh c??ng', ToastAndroid.SHORT);
      })
      .catch((err) => console.log(err));
  }

  function checkAll() {
    const regexUserName = new RegExp(/^[a-z0-9_-]{3,16}$/);
    const regexPassword = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    );
    const userFind = users.findIndex((item) => {
      return item[1].username === username;
    });

    if (!username || !password || !confirm) {
      ToastAndroid.show('H??y ??i???n ????? th??ng tin', ToastAndroid.SHORT);
      return false;
    } else if (!regexUserName.test(username)) {
      ToastAndroid.show(
        'T??n ph???i b???t ?????u b???i b???t k??? ch??? c??i vi???t th?????ng (a-z), s??? (0-9), d???u g???ch d?????i ho???c d???u g???ch n???i.',
        ToastAndroid.SHORT
      );
      return false;
    } else if (userFind >= 0) {
      ToastAndroid.show('Ng?????i d??ng ???? t???n t???i', ToastAndroid.SHORT);
      return false;
    } else if (!regexPassword.test(password)) {
      ToastAndroid.show(
        'M???t kh???u t???i thi???u t??m k?? t???, ??t nh???t m???t ch??? c??i vi???t hoa, m???t ch??? c??i vi???t th?????ng v?? m???t s???',
        ToastAndroid.SHORT
      );
      return false;
    } else if (password !== confirm) {
      ToastAndroid.show('M???t kh???u kh??ng ?????ng b???', ToastAndroid.SHORT);
      return false;
    } else if (!imageSource) {
      ToastAndroid.show('H??y ch???n ???nh ?????i di???n', ToastAndroid.SHORT);
      return false;
    } else {
      return true;
    }
  }

  async function signUp() {
    if (checkAll()) {
      setIsLoading(true);
      const downloadURL = await uploadImage(imageSource, `users/${username}`);
      writeUserData(username, password, downloadURL);
      navigation.navigate('Login');
    }
  }

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <GoBack name={'????ng K??'} navigation={navigation} />
      {isLoading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginHorizontal: 40, marginBottom: 40 }}>
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
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
                  ????ng K??
                </Text>
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
                  navigation.navigate('Login');
                }}
                activeOpacity={0.5}
              >
                <Text style={{ color: COLORS.light, fontSize: 20 }}>
                  ????ng Nh???p
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 30 }}>
              <View>
                <InputValue
                  name="username"
                  activeInput={activeInput}
                  placeholder="T??n t??i kho???n"
                  onPressIn={() => setActiveInput('username')}
                  value={username}
                  onChangeText={(text) => setUsername(text)}
                />
              </View>
              <View style={{ marginTop: 20 }}>
                <InputValue
                  name="password"
                  activeInput={activeInput}
                  placeholder="M???t kh???u"
                  type="password"
                  onPressIn={() => setActiveInput('password')}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
              </View>
              <View style={{ marginTop: 20 }}>
                <InputValue
                  name="confirm"
                  activeInput={activeInput}
                  placeholder="Nh???p l???i m???t kh???u"
                  type="password"
                  onPressIn={() => setActiveInput('confirm')}
                  value={confirm}
                  onChangeText={(text) => setConfirm(text)}
                />
              </View>
              <View
                style={{
                  marginTop: 20,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <View>
                  <View
                    style={{
                      borderColor: COLORS.grey,
                      padding: 20,
                      elevation: 1,
                      width: 120,
                      height: 120,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <TouchableOpacity activeOpacity={0.8} onPress={pickImage}>
                      {imageSource ? (
                        <Image
                          source={{ uri: imageSource }}
                          style={{ width: 100, height: 100 }}
                          resizeMode="contain"
                        />
                      ) : (
                        <MaterialIcons
                          name="add-photo-alternate"
                          size={40}
                          color={COLORS.grey}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                alignItems: 'flex-end',
                justifyContent: 'center',
                marginTop: 10
              }}
            >
              <View style={{ width: 200 }}>
                <ButtonPrimary title={'????ng K??'} onPress={signUp} />
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default RegisterScreen;
