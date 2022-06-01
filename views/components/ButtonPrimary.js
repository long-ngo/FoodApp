import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import COLORS from '../consts/colors';

function ButtonPrimary({ title, onPress = () => {} }) {
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

export { ButtonPrimary };
