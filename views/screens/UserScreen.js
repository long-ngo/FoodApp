import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import '../../firebase/config';

function UserScreen({ route, navigation }) {
  const db = getDatabase();
  const [data, setData] = useState([]);
  useEffect(() => {
    const starCountRef = ref(db, 'foods');
    onValue(starCountRef, (snapshot) => {
      const foodDb = snapshot.val();
      setData(foodDb);
    });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 20,
          paddingHorizontal: 20,
          alignItems: 'center'
        }}
      >
        <Icon
          name="arrow-back-ios"
          size={28}
          onPress={() => navigation.goBack()}
        />
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>User</Text>
      </View>
      <View>
        {data.map((item, index) => (
          <View key={index}>
            <Text>{item.name}</Text>
            <Text>{item.price}</Text>
            <Text>{item.image}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

export default UserScreen;
