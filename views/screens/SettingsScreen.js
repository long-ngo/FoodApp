import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GoBack from '../components/GoBack';

function SettingsScreen({ navigation, route }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GoBack name={'Setting'} navigation={navigation} />
    </SafeAreaView>
  );
}

export default SettingsScreen;
