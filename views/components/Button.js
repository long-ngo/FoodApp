import { TouchableOpacity, StyleSheet, View, Text, Image } from 'react-native';
import COLORS from '../consts/colors';

function PrimaryButton({ title, onPress = () => {} }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={style.btnContainer}>
        <Text style={style.btnTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  btnContainer: {
    backgroundColor: COLORS.primary,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnTitle: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 18
  }
});

function FoodButton({ title, source, active = false, onPress = () => {} }) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: active ? COLORS.primary : COLORS.secondary,
          borderRadius: 30,
          height: 45,
          width: 120,
          paddingHorizontal: 5,
          marginRight: 6
        }}
      >
        <View style={{ backgroundColor: COLORS.white, borderRadius: 20 }}>
          <Image
            source={source}
            style={{
              height: 35,
              width: 35,
              borderRadius: 15,
              resizeMode: 'contain'
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            color: active ? COLORS.white : COLORS.primary,
            marginLeft: 10
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export { PrimaryButton, FoodButton };
