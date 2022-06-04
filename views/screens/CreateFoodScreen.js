import GoBack from '../components/GoBack';
import { SafeAreaView } from 'react-native-safe-area-context';

function CreateFoodScreen({ route, navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GoBack name={'Create Food'} navigation={navigation} />
    </SafeAreaView>
  );
}

export default CreateFoodScreen;
