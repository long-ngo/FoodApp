import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function GoBack({
  name,
  navigation,
  titleRight = '',
  onPressTitleRight = () => {}
}) {
  return (
    <View
      style={{
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back-ios" size={28} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{name}</Text>
      </View>
      {!!titleRight && (
        <TouchableOpacity onPress={onPressTitleRight} activeOpacity={0.5}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{titleRight}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default GoBack;
