import { View, Text } from 'react-native';
import GoBack from '../components/GoBack';
import { SafeAreaView } from 'react-native-safe-area-context';

function FavoriteScreen({ route, navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GoBack name={'Favorite'} navigation={navigation} />
    </SafeAreaView>
  );
}

export default FavoriteScreen;
