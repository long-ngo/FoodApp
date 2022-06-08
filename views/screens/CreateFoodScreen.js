import GoBack from '../components/GoBack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import InputValue from '../components/InputValue';
import { useState, useEffect } from 'react';
import COLORS from '../consts/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import { getDatabase, ref, onValue } from 'firebase/database';

function CreateFoodScreen({ route, navigation }) {
  const [activeInput, setActiveInput] = useState('');
  const [foodName, setFoodName] = useState('');
  const [featured, setFeatured] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [steps, setSteps] = useState([]);
  const [stepImageSource, setStepImageSource] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const db = getDatabase();

  useEffect(() => {
    const starCountRef = ref(db, 'categories');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      let dataArray = [];
      data &&
        (dataArray = Object.entries(data).sort(
          (item1, item2) => item1[1].index - item2[1].index
        ));

      setCategories(dataArray);
    });
  }, []);

  useEffect(() => {
    const selectArray = categories.map((item) => {
      return {
        label: item[1].name,
        value: item[0]
      };
    });

    setItems(selectArray);
  }, [categories]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <GoBack name={'Create Food'} navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginHorizontal: 30, marginBottom: 30 }}>
          <View
            style={{
              alignItems: 'center'
            }}
          >
            <Image
              source={{
                uri: 'https://i.pinimg.com/originals/f0/78/a4/f078a40e4c70594029f27c7932b0ac3e.jpg'
              }}
              style={{ width: 200, height: 200 }}
              resizeMode="contain"
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <InputValue
              name={'foodName'}
              activeInput={activeInput}
              placeholder="Food name"
              onPressIn={() => setActiveInput('foodName')}
              onChangeText={(text) => setFoodName(text)}
              value={foodName}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <InputValue
              name={'featured'}
              activeInput={activeInput}
              placeholder="Featured"
              onPressIn={() => setActiveInput('featured')}
              onChangeText={(text) => setFeatured(text)}
              value={featured}
            />
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
                    arr.push('');
                    setIngredients(arr);
                  }}
                >
                  <MaterialIcons name="add" size={30} />
                </TouchableOpacity>
                <Text style={{ fontSize: 14, color: COLORS.grey }}>Add</Text>
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
                    {stepImageSource[index] ? (
                      <Image
                        style={{ width: 100, height: 100, borderRadius: 4 }}
                        source={{
                          uri: stepImageSource[index]
                        }}
                        resizeMode="cover"
                      />
                    ) : (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                          const stepImageArray = [...stepImageSource];
                          stepImageArray[index] =
                            'https://i.pinimg.com/564x/4f/60/3b/4f603b6bcbfbeca9e93f01a57c041c86.jpg';
                          setStepImageSource(stepImageArray);
                        }}
                      >
                        <MaterialIcons
                          name="add-photo-alternate"
                          size={30}
                          color={COLORS.grey}
                        />
                      </TouchableOpacity>
                    )}
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
                        value={item}
                        name={`step${index}`}
                        activeInput={activeInput}
                        placeholder="Nhập cách làm"
                        onPressIn={() => setActiveInput(`step${index}`)}
                        onChangeText={(text) => {
                          const arr = [...steps];
                          arr[index] = text;
                          setSteps(arr);
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
                          const imageArray = [...stepImageSource];
                          imageArray.splice(index, 1);
                          setStepImageSource(imageArray);
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
                    const arr = [...steps];
                    arr.push('');
                    setSteps(arr);
                  }}
                >
                  <MaterialIcons name="add" size={30} />
                </TouchableOpacity>
                <Text style={{ fontSize: 14, color: COLORS.grey }}>Add</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default CreateFoodScreen;
