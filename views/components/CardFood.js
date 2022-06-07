import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import COLORS from '../consts/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const { width } = Dimensions.get('screen');

function CardFood({ title, source, desc, time, onPress = () => {} }) {
  return (
    <TouchableHighlight
      activeOpacity={0.9}
      underlayColor={COLORS.white}
      onPress={onPress}
    >
      <View
        style={{
          height: 220,
          width: width / 2 - 30,
          backgroundColor: COLORS.white,
          borderRadius: 15,
          elevation: 13,
          paddingHorizontal: 20
        }}
      >
        <View
          style={{
            top: -30,
            alignItems: 'center',
            height: 110
          }}
        >
          <Image source={{ uri: source }} style={{ width: 120, height: 120 }} />
        </View>
        <View>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
          <Text style={{ fontSize: 14, color: COLORS.grey }}>{desc}</Text>
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons name="access-time" size={18} color={COLORS.grey} />
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                marginLeft: 2,
                color: COLORS.greyLight
              }}
            >
              {time}
            </Text>
          </View>
          <View
            style={{
              width: 30,
              height: 30,
              backgroundColor: COLORS.primary,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <MaterialIcons name="add" size={20} color={COLORS.white} />
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}

export { CardFood };
