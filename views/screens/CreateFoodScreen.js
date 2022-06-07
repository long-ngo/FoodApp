import GoBack from '../components/GoBack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import InputValue from '../components/InputValue';
import { useState } from 'react';
import COLORS from '../consts/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function CreateFoodScreen({ route, navigation }) {
  const [activeInput, setActiveInput] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GoBack name={'Create Food'} navigation={navigation} />
      <ScrollView>
        <View style={{ marginHorizontal: 30 }}>
          <View
            style={{
              backgroundColor: COLORS.white,
              alignItems: 'center',
              height: 200
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
          <View>
            <InputValue
              name={'foodName'}
              activeInput={activeInput}
              placeholder="Food name"
              onPressIn={() => setActiveInput('foodName')}
              //onChangeText={(text) => setPassword(text)}
              type="text"
            />
          </View>
          <View>
            <InputValue
              name={'featured'}
              activeInput={activeInput}
              placeholder="Featured"
              onPressIn={() => setActiveInput('featured')}
              //onChangeText={(text) => setPassword(text)}
              type="text"
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <View>
              <Text style={{ fontSize: 20 }}>Nguyên liệu</Text>
            </View>

            {ingredients.map((item, index) => (
              <View
                style={{ flexDirection: 'row', alignItems: 'center' }}
                key={index}
              >
                <View style={{ flex: 1 }}>
                  <InputValue
                    value={ingredients[index]}
                    name={index}
                    activeInput={activeInput}
                    placeholder="Nhập nguyên liệu"
                    onPressIn={() => setActiveInput(index)}
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
                          activeInput === index ? COLORS.primary : COLORS.grey
                        }
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            <View style={{ marginTop: 10 }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  const arr = [...ingredients];
                  arr.push('');
                  setIngredients(arr);
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <MaterialIcons name="add" size={30} />
                  <Text style={{ fontSize: 14, color: COLORS.grey }}>Thêm</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default CreateFoodScreen;
