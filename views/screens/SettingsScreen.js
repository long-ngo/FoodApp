import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

function SettingsScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Icon name="arrow-back-ios" size={28} />
        <Text>Setting</Text>
      </View>
    </SafeAreaView>
  );
}

export default SettingsScreen;
