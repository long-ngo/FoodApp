import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';

function GoBack({
  name,
  navigation,
  titleRight = null,
  onPressTitleRight = () => {},
  disabled = false
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
      {titleRight && (
        <TouchableOpacity
          onPress={onPressTitleRight}
          activeOpacity={0.5}
          disabled={disabled}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: disabled ? COLORS.grey : COLORS.dark
            }}
          >
            {titleRight}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default GoBack;
