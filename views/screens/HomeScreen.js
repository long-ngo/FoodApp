import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ButtonFood } from '../components/ButtonFood';
import { CardFood } from '../components/CardFood';
import { useState, useEffect } from 'react';
import foodsConsts from '../consts/foods';
import { getDatabase, ref, onValue } from 'firebase/database';

function HomeScreen({ navigation, route }) {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const db = getDatabase();
  useEffect(() => {
    const starCountRef = ref(db, 'categories');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const dataArray = Object.values(data);
      setCategories(dataArray);
    });
  }, []);
  useEffect(() => {
    const starCountRef = ref(db, 'foods');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const dataArray = Object.values(data);
      setFoods(dataArray);
    });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20
        }}
      >
        <View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 28 }}>Hello,</Text>
            <Text style={{ fontSize: 28, fontWeight: 'bold', marginLeft: 10 }}>
              Aryz
            </Text>
          </View>
          <Text style={{ fontSize: 22, color: COLORS.grey, marginTop: 5 }}>
            What do you want today
          </Text>
        </View>
        <Image
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
            resizeMode: 'contain'
          }}
          source={require('../../assets/person.png')}
        />
      </View>
      <View
        style={{ marginTop: 40, paddingHorizontal: 20, flexDirection: 'row' }}
      >
        <View
          style={{
            backgroundColor: COLORS.light,
            height: 50,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            flex: 1
          }}
        >
          <Icon name="search" size={28} />
          <TextInput
            style={{ fontSize: 18, flex: 1, marginLeft: 10 }}
            placeholder="Search for food"
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            width: 50,
            height: 50,
            backgroundColor: COLORS.primary,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            marginLeft: 10
          }}
        >
          <Icon name="tune" size={28} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingTop: 30,
          paddingHorizontal: 20,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((item, index) => (
            <ButtonFood
              active={categoryIndex == index ? true : false}
              key={index}
              title={item.name}
              source={item.image}
              onPress={() => setCategoryIndex(index)}
            />
          ))}
        </ScrollView>
      </View>
      <View style={{ marginTop: 20, flex: 1 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={foods}
          renderItem={({ item }) => (
            <View style={{ marginLeft: 20, marginVertical: 30 }}>
              <CardFood
                name={item.name}
                source={item.image}
                desc={item.featured}
                time={item.time}
                onPress={() => navigation.navigate('Details', item)}
              />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
