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
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.white,
              borderRadius: 35,
              height: 35,
              width: 35
            }}
          >
            <Image
              source={{
                uri: image
              }}
              style={{
                width: 35,
                height: 35,
                borderRadius: 35
              }}
              resizeMode="contain"
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
