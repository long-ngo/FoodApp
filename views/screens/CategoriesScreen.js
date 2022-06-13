import {
  View,
  Image,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator
} from 'react-native';
import GoBack from '../components/GoBack';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../consts/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import InputValue from '../components/InputValue';
import { useState, useEffect } from 'react';
import { ref, getDatabase, set, push, onValue } from 'firebase/database';
import * as ImagePicker from 'expo-image-picker';
import { uploadImage } from '../../firebase/upload';

function CategoriesScreen({ route, navigation }) {
  const [categoryImage, setCategoryImage] = useState(null);
  const [activeInput, setActiveInput] = useState(null);
  const [categoryName, setCategoryName] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const db = getDatabase();

  useEffect(() => {
    const starCountRef = ref(db, 'categories');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const dataArray = data ? Object.entries(data) : [];
      setCategories(dataArray);
    });
    return () => {
      setCategories([]);
      setCategoryImage(null);
      setCategoryName(null);
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
      setCategoryImage(result.uri);
    }
  }

  function writeCategoryData(name, image) {
    const categoryRef = push(ref(db, 'categories'));
    set(categoryRef, {
      name: name,
      image: image
    })
      .then(() => {
        setIsLoading(false);
        clearAll();
        ToastAndroid.show('Tạo danh mục thành công', ToastAndroid.SHORT);
      })
      .catch((err) => console.log(err));
  }

  function checkAll() {
    const findIndex = categories.findIndex(
      (item) => categoryName && item[1].name === categoryName.trim()
    );

    if (!categoryName || !categoryImage) {
      ToastAndroid.show('Hãy điền đủ thông tin', ToastAndroid.SHORT);
      return false;
    } else if (findIndex >= 0) {
      ToastAndroid.show('Hãy thử với tên khác', ToastAndroid.SHORT);
      return false;
    } else {
      return true;
    }
  }

  function clearAll() {
    setCategoryImage(null);
    setCategoryName(null);
  }

  async function handleSubmit() {
    if (checkAll()) {
      setIsLoading(true);
      const url = await uploadImage(
        categoryImage,
        `categories/${categoryName}`
      );
      writeCategoryData(categoryName, url);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <GoBack
        name={'Tạo Danh Mục '}
        navigation={navigation}
        titleRight="Xong"
        onPressTitleRight={handleSubmit}
        disabled={isLoading}
      />
      {isLoading ? (
        <ActivityIndicator size={'large'} color={COLORS.primary} />
      ) : (
        <View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 200,
              borderRadius: 10,
              borderWidth: 0.5,
              borderColor: COLORS.grey,
              marginHorizontal: 30
            }}
          >
            <TouchableOpacity onPress={pickImage} activeOpacity={0.5}>
              {categoryImage ? (
                <Image
                  source={{
                    uri: categoryImage
                  }}
                  style={{ width: 200, height: 198 }}
                  resizeMode="contain"
                />
              ) : (
                <MaterialIcons
                  name="add-photo-alternate"
                  size={48}
                  color={COLORS.grey}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 10, marginHorizontal: 30 }}>
            <InputValue
              name={'categoryName'}
              activeInput={activeInput}
              placeholder="Nhập danh mục"
              onPressIn={() => setActiveInput('categoryName')}
              onChangeText={(text) => setCategoryName(text)}
              value={categoryName}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

export default CategoriesScreen;
