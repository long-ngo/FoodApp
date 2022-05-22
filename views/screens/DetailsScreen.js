import { View, Text, Button } from 'react-native';

function DetailsScreen({ route, navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Go to home" onPress={() => navigation.goBack()} />
    </View>
  );
}

export default DetailsScreen;
