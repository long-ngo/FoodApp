import { View, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function GoBack({ name, navigation }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingVertical: 20,
        paddingHorizontal: 20,
        alignItems: 'center'
      }}
    >
      <MaterialIcons
        name="arrow-back-ios"
        size={28}
        onPress={() => navigation.goBack()}
      />
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{name}</Text>
    </View>
  );
}

export default GoBack;
