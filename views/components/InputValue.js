import { TextInput, View, TouchableOpacity } from 'react-native';
import COLORS from '../consts/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from 'react';

function InputValue({
  onPressIn = () => {},
  activeInput,
  name,
  placeholder,
  type = 'text'
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: 50,
        borderBottomWidth: activeInput === name ? 1 : 0.5,
        borderBottomColor:
          activeInput === name ? COLORS.primary : COLORS.greyLight
      }}
    >
      <TextInput
        secureTextEntry={type === 'password' && !showPassword ? true : false}
        onPressIn={onPressIn}
        placeholder={placeholder}
        style={{
          fontSize: 18,
          height: 50,
          flex: 1
        }}
      />
      {type === 'password' && (
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          activeOpacity={0.6}
        >
          <MaterialCommunityIcons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            style={{ marginLeft: 10 }}
            color={activeInput === name ? COLORS.primary : COLORS.grey}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

export default InputValue;
