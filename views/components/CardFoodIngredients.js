import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../consts/colors';

function CardFoodIngredients({ title, time, ingredient }) {
  return (
    <TouchableOpacity activeOpacity={0.99}>
      <View
        style={{
          backgroundColor: COLORS.white,
          paddingHorizontal: 20,
          paddingVertical: 20,
          borderRadius: 10,
          elevation: 1
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{title}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons name="access-time" color={COLORS.grey} />
            <Text style={{ fontSize: 15, color: COLORS.grey }}>{time} min</Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 10
          }}
        >
          <View>
            <Text style={{ fontSize: 18 }}>Nguyên liệu</Text>
          </View>
        </View>
        <View>
          {ingredient.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10
              }}
            >
              <View
                style={{
                  backgroundColor: COLORS.primary,
                  width: 4,
                  height: 22
                }}
              />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 17, color: COLORS.greyLight }}>
                  {item}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export { CardFoodIngredients };
