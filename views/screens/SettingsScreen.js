import { View, Button, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GoBack from '../components/GoBack';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../redux/userSlice';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

function loadXHR(url) {
  return new Promise((resolve, reject) => {
    try {
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.open('GET', url, true);
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(xhr.statusText);
      };
      xhr.send(null);
    } catch (error) {
      reject(error);
    }
  });
}

function SettingsScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const storage = getStorage();
  const imageRef = ref(storage, 'images');
  const [image, setImage] = useState(null);

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GoBack name={'Setting'} navigation={navigation} />
      <View>
        <Button
          title="Logout"
          onPress={() => {
            dispatch(removeUser());
          }}
        />
      </View>
      <View>
        <Button title="upload image" onPress={() => pickImage()} />
      </View>
      <View>
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: 300, height: 300 }}
            resizeMode="contain"
          />
        )}
      </View>
      <View>
        <Button
          title="upload firebase"
          onPress={() => {
            loadXHR(image)
              .then((file) => {
                uploadBytes(imageRef, file).then((snapshot) => {
                  console.log(snapshot);
                });
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        />
      </View>
    </SafeAreaView>
  );
}

export default SettingsScreen;
