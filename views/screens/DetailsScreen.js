import { View, Text, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import { CardFoodIngredients } from '../components/CardFoodIngredients';
import { CardStepFood } from '../components/CardStepFood';

function DetailsScreen({ route, navigation }) {
  const { name, image } = route.params;

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.brownLight, flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 20,
          paddingHorizontal: 20,
          alignItems: 'center'
        }}
      >
        <MaterialIcons
          name="arrow-back-ios"
          size={28}
          onPress={() => navigation.goBack()}
        />
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{name}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            height: 300
          }}
        >
          <Image
            source={image}
            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
          />
        </View>
        <View style={{ top: -100, marginHorizontal: 20 }}>
          <CardFoodIngredients />
        </View>
        <View
          style={{ marginHorizontal: 20, paddingVertical: 20, marginTop: -100 }}
        >
          <View style={{ marginTop: 30 }}>
            <CardStepFood
              num={1}
              text="Take an avocado, cut it in half, remove the pit and scoop out the
          flesh with a spoon. Mash it with a fork in a bowl and drizzle with
          lemon juice."
              src={require('../../assets/meatPizza.png')}
            />
          </View>
          <View style={{ marginTop: 30 }}>
            <CardStepFood
              num={2}
              src={require('../../assets/chickenBurger.png')}
            />
          </View>
          <View style={{ marginTop: 30 }}>
            <CardStepFood
              num={3}
              text="Take an avocado, cut it in half, remove the pit and scoop out the
          flesh with a spoon. Mash it with a fork in a bowl and drizzle with
          lemon juice."
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default DetailsScreen;
