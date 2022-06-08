import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import COLORS from '../consts/colors';
import { ButtonPrimary } from '../components/ButtonPrimary';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import GoBack from '../components/GoBack';
import InputValue from '../components/InputValue';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import * as ImagePicker from 'expo-image-picker';
import { loadXHR } from '../../convert/imageToBlob';

import * as Storage from 'firebase/storage';
import { ref, getDatabase, set, push, onValue } from 'firebase/database';

function RegisterScreen({ route, navigation }) {
  const [users, setUsers] = useState([]);
  const [activeInput, setActiveInput] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [imageSource, setImageSource] = useState('');
  const storage = Storage.getStorage();
  const database = getDatabase();

  useEffect(() => {
    const starCountRef = ref(database, 'users');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      let dataArray = [];
      data && (dataArray = Object.entries(data));
      setUsers(dataArray);
    });
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
      .then(() => console.log('Successful upload'))
      .catch((err) => console.log(err));
  }

  async function uploadImage() {
    const imageRef = Storage.ref(storage, `users/${username}`);

    loadXHR(imageSource)
      .then((file) => {
        const uploadTask = Storage.uploadBytesResumable(imageRef, file, {
          contentType: 'image/png'
        });

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;
              case 'storage/canceled':
                // User canceled the upload
                break;

              // ...

              case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            Storage.getDownloadURL(uploadTask.snapshot.ref).then(
              (downloadURL) => {
                console.log('File available at', downloadURL);
                writeUserData(username, password, downloadURL);
              }
            );
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function clearAll() {
    setUsername('');
    setPassword('');
    setConfirm('');
    setImageSource('');
  }

  function checkAll() {
    const regex = new RegExp(/\s/);
    const userFind = users.findIndex((item) => {
      return item[1].username === username;
    });

    if (username === '' || password === '' || confirm === '') {
      alert('giá trị không được rỗng');
      return false;
    } else if (regex.test(username)) {
      alert('username không được có khoảng trắng');
      return false;
    } else if (!userFind) {
      alert('username đã tồn tại');
      return false;
    } else if (password !== confirm) {
      alert('password không giống nhau');
      return false;
    } else {
      return true;
    }
  }

  function validationInput() {
    setUsername(username.trim());
    setPassword(password.trim());
    setConfirm(confirm.trim());
  }

  function signUp() {
    validationInput();

    if (checkAll()) {
      uploadImage();
      clearAll();
      navigation.navigate('Login');
    }
  }

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <GoBack name={'Sign Up'} navigation={navigation} />
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
                value={username}
                onChangeText={(text) => setUsername(text)}
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <InputValue
                name="password"
                activeInput={activeInput}
                placeholder="Password"
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
                placeholder="Re-inter password"
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
              <View style={{}}>
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
                    {!!imageSource ? (
                      <Image
                        source={{ uri: imageSource }}
                        style={{ width: 100, height: 100 }}
                        resizeMode="contain"
                      />
                    ) : (
                      <Octicons name="person" size={40} color={COLORS.grey} />
                    )}
                  </View>
                </View>
              </View>
              <View style={{ marginLeft: 10 }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => pickImage()}
                >
                  <View>
                    <MaterialIcons
                      name="file-upload"
                      size={40}
                      color={
                        activeInput === 'image' ? COLORS.primary : COLORS.grey
                      }
                    />
                  </View>
                </TouchableOpacity>
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
              <ButtonPrimary title={'Sign Up'} onPress={() => signUp()} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default RegisterScreen;
