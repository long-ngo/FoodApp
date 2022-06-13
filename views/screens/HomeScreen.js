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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ButtonCategory } from '../components/ButtonCategory';
import { CardFood } from '../components/CardFood';
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useSelector } from 'react-redux';

function HomeScreen({ navigation, route }) {
  const [categoryIndex, setCategoryIndex] = useState('All');
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [showFoods, setShowFoods] = useState([]);
  const [inputFind, setInputFind] = useState(null);
  const db = getDatabase();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userLogin = useSelector((state) => state.user.userLogin);

  useEffect(() => {
    const starCountRef = ref(db, 'categories');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const dataArray = data ? Object.entries(data) : [];
      dataArray.length &&
        dataArray.unshift([
          'All',
          {
            image:
              'https://i.pinimg.com/originals/4d/05/d7/4d05d7f4db1c77d92c54d1342e7814af.jpg',
            name: 'Tất cả'
          }
        ]);
      setCategories(dataArray);
      return () => {
        setCategories([]);
        setShowCategories([]);
      };
    });
  }, []);
  useEffect(() => {
    const starCountRef = ref(db, 'foods');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const dataArray = data ? Object.entries(data) : [];
      setFoods(dataArray);
      return () => {
        setFoods([]);
        setShowFoods([]);
      };
    });
  }, []);
  useEffect(() => {
    setShowFoods(foods);
    setShowCategories(categories);
  }, [foods, categories]);
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
            <Text style={{ fontSize: 28 }}>Xin chào,</Text>
            <Text style={{ fontSize: 28, fontWeight: 'bold', marginLeft: 10 }}>
              {isLoggedIn
                ? userLogin[1].name
                  ? userLogin[1].name
                  : userLogin[1].username
                : 'Bạn'}
            </Text>
          </View>
          <Text style={{ fontSize: 22, color: COLORS.grey, marginTop: 5 }}>
            Bạn muốn làm gì hôm nay
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          // onPress={() => navigation.navigate('Login')}
        >
          {isLoggedIn ? (
            userLogin[1].image ? (
              <Image
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 25,
                  resizeMode: 'contain'
                }}
                source={{ uri: userLogin[1].image }}
              />
            ) : (
              <Ionicons name="person" size={40} />
            )
          ) : (
            <Ionicons name="person-circle-outline" size={50} />
          )}
        </TouchableOpacity>
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
          <MaterialIcons name="search" size={28} />
          <TextInput
            style={{ fontSize: 18, flex: 1, marginLeft: 10 }}
            placeholder="Tìm kiếm món ăn"
            onChangeText={(text) => {
              setInputFind(text);
              const foodArray = foods.filter((item) => {
                return (
                  (categoryIndex === 'All' &&
                    item[1].name.toLowerCase().includes(text)) ||
                  (item[1].name.toLowerCase().includes(text) &&
                    item[1].categoryId === categoryIndex)
                );
              });

              setShowFoods(foodArray);
            }}
            value={inputFind}
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
          <MaterialIcons name="tune" size={28} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 20,
          paddingHorizontal: 20,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {showCategories.map((item) => (
            <ButtonCategory
              active={categoryIndex === item[0] ? true : false}
              key={item[0]}
              title={item[1].name}
              image={item[1].image}
              onPress={() => {
                setCategoryIndex(item[0]);
                const filterFoods = foods.filter(
                  (food) => food[1].categoryId === item[0]
                );
                if (item[1].name === 'Tất cả') {
                  setShowFoods(foods);
                } else {
                  setShowFoods(filterFoods);
                }
              }}
            />
          ))}
        </ScrollView>
      </View>
      <View style={{ marginTop: 20, flex: 1 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={showFoods}
          renderItem={({ item }) => (
            <View style={{ marginLeft: 20, marginVertical: 30 }} key={item[0]}>
              <CardFood
                title={item[1].name}
                source={item[1].image}
                desc={item[1].featured}
                time={item[1].time}
                onPress={() => navigation.navigate('Details', item[1])}
              />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
