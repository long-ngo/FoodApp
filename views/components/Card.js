import { View, Text, Image, Dimensions } from 'react-native';
import COLORS from '../consts/colors';

const { width } = Dimensions.get('screen');

function FoodCard({ title, source, desc, price }) {
  return (
    <View
      style={{
        height: 220,
        width: width / 2 - 30,
        backgroundColor: COLORS.white,
        borderRadius: 15,
        elevation: 13,
        marginLeft: 20,
        marginVertical: 30,
        paddingHorizontal: 20
      }}
    >
      <View
        style={{
          top: -30,
          alignItems: 'center'
        }}
      >
        <Image source={source} style={{ width: 100, height: 100 }} />
      </View>
      <View>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{title}</Text>
        <Text style={{ fontSize: 18, color: COLORS.grey }}>{desc}</Text>
      </View>
      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{price}</Text>
        <View
          style={{
            width: 20,
            height: 20,
            backgroundColor: COLORS.primary,
            borderRadius: 10
          }}
        ></View>
      </View>
    </View>
  );
}

export { FoodCard };
