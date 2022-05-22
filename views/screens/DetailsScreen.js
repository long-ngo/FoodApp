import { View, Text, Button } from 'react-native';

function DetailsScreen({ route, navigation }) {
  const { itemId, otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>{itemId}</Text>
      <Text>{otherParam}</Text>
      <Button title="Go to home" onPress={() => navigation.goBack()} />
    </View>
  );
}

export default DetailsScreen;
