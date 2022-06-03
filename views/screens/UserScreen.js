import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GoBack from '../components/GoBack';

function UserScreen({ route, navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GoBack name={'User'} navigation={navigation} />
    </SafeAreaView>
  );
}

export default UserScreen;
