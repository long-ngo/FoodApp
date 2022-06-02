import { View, Text, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import { CardFoodIngredients } from '../components/CardFoodIngredients';
import { CardStepFood } from '../components/CardStepFood';
import { useEffect, useState } from 'react';

function DetailsScreen({ route, navigation }) {
  const { name, image, time, ingredients, step } = route.params;
  const [ingredient, setIngredient] = useState([]);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    const ingredientsArray = ingredients.split('.').map((item) => item.trim());
    const stepArray = Object.entries(step).sort(
      (item1, item2) => item1[1].numberStep - item2[1].numberStep
    );
    setIngredient(ingredientsArray);
    setSteps(stepArray);
  }, []);

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
            source={{ uri: image }}
            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
          />
        </View>
        <View style={{ top: -100, marginHorizontal: 20 }}>
          <CardFoodIngredients
            name={name}
            time={time}
            ingredient={ingredient}
          />
        </View>
        <View
          style={{ marginHorizontal: 20, paddingVertical: 20, marginTop: -100 }}
        >
          {steps.map((item) => (
            <View style={{ marginTop: 20 }} key={item[0]}>
              <CardStepFood
                numberStep={item[1].numberStep}
                description={item[1].description}
                image={item[1].image}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default DetailsScreen;
