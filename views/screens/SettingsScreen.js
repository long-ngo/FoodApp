import { View, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GoBack from '../components/GoBack';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../redux/userSlice';

function SettingsScreen({ navigation, route }) {
  const dispatch = useDispatch();
  login();
  checkUserStatus();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GoBack name={'Setting'} navigation={navigation} />
      <View>
        <Button
          title="Logout"
          onPress={() => {
            dispatch(removeUser());
          }}
        />
      </View>
    </SafeAreaView>
  );
}

export default SettingsScreen;
