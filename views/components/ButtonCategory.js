import { TouchableOpacity, View, Text, Image } from 'react-native';
import COLORS from '../consts/colors';

function ButtonCategory({ title, image, active = false, onPress = () => {} }) {
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
        {image && (
          <View style={{ backgroundColor: COLORS.white, borderRadius: 20 }}>
            <Image
              source={{
                uri: image
              }}
              style={{
                height: 35,
                width: 35,
                borderRadius: 15,
                resizeMode: 'contain'
              }}
            />
          </View>
        )}

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

export { ButtonCategory };
