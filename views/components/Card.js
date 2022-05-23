import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import COLORS from '../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
const { width } = Dimensions.get('screen');

function FoodCard({ title, source, desc, price, onPress = () => {} }) {
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
          <Image source={source} style={{ width: 120, height: 120 }} />
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
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>${price}</Text>
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
            <Icon name="add" size={20} color={COLORS.white} />
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}

export { FoodCard };
