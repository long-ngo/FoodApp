import GoBack from '../components/GoBack';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  ToastAndroid
} from 'react-native';
import InputValue from '../components/InputValue';
import { useState, useEffect } from 'react';
import COLORS from '../consts/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import { ref, getDatabase, set, push, onValue } from 'firebase/database';
import { uploadImage } from '../../firebase/upload';
import { useSelector } from 'react-redux';

function FoodsScreen({ route, navigation }) {
  const [activeInput, setActiveInput] = useState(null);
  const [foodName, setFoodName] = useState(null);
  const [featured, setFeatured] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [foodImage, setFoodImage] = useState(null);
  const [steps, setSteps] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [time, setTime] = useState(15);
  const [isLoading, setIsLoading] = useState(false);
  const db = getDatabase();
  const userLogin = useSelector((state) => state.user.userLogin);

  useEffect(() => {
    const starCountRef = ref(db, 'categories');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const dataArray = data ? Object.entries(data) : [];
      setCategories(dataArray);
    });
    return () => {
      setCategories([]);
      setActiveInput(null);
      setIngredients([]);
      setFoodImage(null);
      setSteps([]);
    };
  }, []);

  useEffect(() => {
    const starCountRef = ref(db, 'foods');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const dataArray = data ? Object.entries(data) : [];
      setFoods(dataArray);
    });
    return () => {
      setFoods([]);
    };
  }, []);

  useEffect(() => {
    const selectArray = categories.map((item) => {
      return {
        label: item[1].name,
        value: item[0]
      };
    });

    setItems(selectArray);
    selectArray.length && setValue(selectArray[0].value);
  }, [categories]);

  async function pickImage(key, index = null) {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1
    });

    if (!result.cancelled) {
      switch (key) {
        case 'food':
          setFoodImage(result.uri);
          break;
        case 'step':
          const stepArray = [...steps];
          stepArray[index].stepImage = result.uri;
          setSteps(stepArray);
          break;
      }
    }
  }

  function clearAll() {
    setFoodImage(null);
    setFoodName(null);
    setFeatured(null);
    setIngredients([]);
    setSteps([]);
  }

  function writeFoodData(
    name,
    featured,
    image,
    ingredients,
    step,
    time,
    userId,
    categoryId
  ) {
    const foodRef = push(ref(db, 'foods'));
    set(foodRef, {
      name: name,
      featured: featured,
      image: image,
      ingredients: ingredients,
      step: step,
      time: time,
      userId: userId,
      categoryId: categoryId
    })
      .then(() => {
        setIsLoading(false);
        clearAll();
      })
      .catch((err) => console.log(err));
  }

  function checkAll() {
    const foodsfilter = foods.filter(
      (item) =>
        foodName &&
        item[1].userId === userLogin[0] &&
        item[1].name === foodName.trim()
    );
    const stepEvery = steps.every((item) => item.description && item.stepImage);
    const ingredientsEvery = ingredients.every((item) => item);

    if (
      !foodName ||
      !featured ||
      !foodImage ||
      !ingredients.length ||
      !steps.length ||
      !value
    ) {
      ToastAndroid.show('Hãy điền đủ thông tin', ToastAndroid.SHORT);
      return false;
    } else if (foodsfilter.length) {
      ToastAndroid.show('Bạn đã tạo món này', ToastAndroid.SHORT);
      return false;
    } else if (!ingredientsEvery) {
      ToastAndroid.show(
        'Hãy điền đủ thông tin nguyên liệu',
        ToastAndroid.SHORT
      );
      return false;
    } else if (!stepEvery) {
      ToastAndroid.show('Hãy điền đủ thông tin cách làm', ToastAndroid.SHORT);
      return false;
    } else {
      return true;
    }
  }

  function handleSubmit() {
    if (checkAll()) {
      setIsLoading(true);
      const foodsArray = [
        Promise.resolve(
          uploadImage(
            foodImage,
            `foods/${foodName + userLogin[1].username}/${foodName}`
          )
        )
      ];
      const stepsArray = steps.map((item, index) => {
        return Promise.resolve(
          uploadImage(
            item.stepImage,
            `foods/${foodName + userLogin[1].username}/step${index + 1}`
          )
        );
      });
      Promise.all([...foodsArray, ...stepsArray]).then((urlArray) => {
        const image = urlArray.splice(0, 1).join('');
        const stepsArray = steps.map((item, index) => ({
          description: item.description,
          image: urlArray[index]
        }));
        const ingredientsString = ingredients.join('&');

        writeFoodData(
          foodName,
          featured,
          image,
          ingredientsString,
          stepsArray,
          time,
          userLogin[0],
          value
        );
      });
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <GoBack
        onPressTitleRight={handleSubmit}
        name={'Tạo món'}
        navigation={navigation}
        titleRight="Xong"
        disabled={isLoading}
      />
      {isLoading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginHorizontal: 30, marginBottom: 30 }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 200,
                borderRadius: 10,
                borderWidth: 0.5,
                borderColor: COLORS.grey
              }}
            >
              <TouchableOpacity
                onPress={() => pickImage('food')}
                activeOpacity={0.5}
              >
                {foodImage ? (
                  <Image
                    source={{
                      uri: foodImage
                    }}
                    style={{ width: 190, height: 200 }}
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
            <View style={{ marginTop: 10 }}>
              <InputValue
                name={'foodName'}
                activeInput={activeInput}
                placeholder="Tên món"
                onPressIn={() => setActiveInput('foodName')}
                onChangeText={(text) => setFoodName(text)}
                value={foodName}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <InputValue
                name={'featured'}
                activeInput={activeInput}
                placeholder="Đặc trưng"
                onPressIn={() => setActiveInput('featured')}
                onChangeText={(text) => setFeatured(text)}
                value={featured}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20
              }}
            >
              <View style={{ marginRight: 15 }}>
                <Text style={{ fontSize: 20 }}>Thời gian nấu</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setTime(time - 1)}
                >
                  <View
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 15,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <MaterialCommunityIcons
                      name="minus"
                      size={28}
                      color={COLORS.greyLight}
                    />
                  </View>
                </TouchableOpacity>
                <Text style={{ fontSize: 18, marginHorizontal: 8 }}>
                  {time}
                </Text>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setTime(time + 1)}
                >
                  <View
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 15,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <MaterialIcons
                      name="add"
                      size={28}
                      color={COLORS.greyLight}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginTop: 20 }}>
              <View>
                <Text style={{ fontSize: 20 }}>Danh mục</Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  listMode="SCROLLVIEW"
                />
              </View>
            </View>

            <View style={{ marginTop: 20 }}>
              <View>
                <Text style={{ fontSize: 20 }}>Nguyên liệu</Text>
              </View>
              {ingredients.map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 20
                  }}
                >
                  <View
                    style={{
                      marginRight: 10,
                      borderWidth: 1,
                      width: 34,
                      height: 34,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 50,
                      borderColor:
                        activeInput === `ingredient${index}`
                          ? COLORS.primary
                          : COLORS.grey
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        color:
                          activeInput === `ingredient${index}`
                            ? COLORS.primary
                            : COLORS.grey
                      }}
                    >
                      {index + 1}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <InputValue
                      value={item}
                      name={`ingredient${index}`}
                      activeInput={activeInput}
                      placeholder="Nhập nguyên liệu"
                      onPressIn={() => setActiveInput(`ingredient${index}`)}
                      onChangeText={(text) => {
                        const arr = [...ingredients];
                        arr[index] = text;
                        setIngredients(arr);
                      }}
                    />
                  </View>
                  <View style={{ marginLeft: 10 }}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        const arr = [...ingredients];
                        arr.splice(index, 1);
                        setIngredients(arr);
                      }}
                    >
                      <View>
                        <MaterialIcons
                          name="close"
                          size={30}
                          color={
                            activeInput === `ingredient${index}`
                              ? COLORS.primary
                              : COLORS.grey
                          }
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
              <View style={{ marginTop: 10 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      const arr = [...ingredients];
                      arr.push(null);
                      setIngredients(arr);
                    }}
                  >
                    <MaterialIcons name="add" size={30} />
                  </TouchableOpacity>
                  <Text style={{ fontSize: 14, color: COLORS.grey }}>Thêm</Text>
                </View>
              </View>
            </View>
            <View style={{ marginTop: 20 }}>
              <View>
                <Text style={{ fontSize: 20 }}>Cách làm</Text>
              </View>
              {steps.map((item, index) => (
                <View key={index} style={{ marginTop: 20 }}>
                  <View>
                    <Text
                      style={{
                        fontSize: 18,
                        color:
                          activeInput === `step${index}`
                            ? COLORS.primary
                            : COLORS.dark
                      }}
                    >
                      Bước {index + 1}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start'
                    }}
                  >
                    <View
                      style={{
                        width: 104,
                        height: 104,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 10,
                        borderColor: COLORS.grey,
                        borderWidth: 0.5,
                        borderRadius: 4
                      }}
                    >
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                          pickImage('step', index);
                        }}
                      >
                        {item.stepImage ? (
                          <Image
                            style={{ width: 100, height: 100, borderRadius: 4 }}
                            source={{
                              uri: item.stepImage
                            }}
                            resizeMode="cover"
                          />
                        ) : (
                          <MaterialIcons
                            name="add-photo-alternate"
                            size={30}
                            color={COLORS.grey}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center'
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          marginLeft: 10
                        }}
                      >
                        <InputValue
                          numberOfLines={4}
                          multiline
                          value={item.description}
                          name={`step${index}`}
                          activeInput={activeInput}
                          placeholder="Nhập cách làm"
                          onPressIn={() => setActiveInput(`step${index}`)}
                          onChangeText={(text) => {
                            const stepsArray = [...steps];
                            stepsArray[index].description = text;
                            setSteps(stepsArray);
                          }}
                        />
                      </View>
                      <View style={{ marginLeft: 10 }}>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => {
                            const stepsArray = [...steps];
                            stepsArray.splice(index, 1);
                            setSteps(stepsArray);
                          }}
                        >
                          <View>
                            <MaterialIcons
                              name="close"
                              size={30}
                              color={
                                activeInput === `step${index}`
                                  ? COLORS.primary
                                  : COLORS.grey
                              }
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
              <View style={{ marginTop: 10 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      const stepsArray = [...steps];
                      stepsArray.push({
                        description: null,
                        stepImage: null
                      });
                      setSteps(stepsArray);
                    }}
                  >
                    <MaterialIcons name="add" size={30} />
                  </TouchableOpacity>
                  <Text style={{ fontSize: 14, color: COLORS.grey }}>Thêm</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default FoodsScreen;
