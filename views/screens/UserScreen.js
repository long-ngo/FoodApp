import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';

function UserScreen({ route, navigation }) {
  const db = getDatabase();
  const [data, setData] = useState([]);
  useEffect(() => {
    const starCountRef = ref(db, 'User');
    onValue(starCountRef, (snapshot) => {
      const userDB = snapshot.val();
      //console.log(userDB);
      //setData(userDB);
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
          <View key={index}></View>
        ))}
      </View>
    </SafeAreaView>
  );
}

export default UserScreen;
