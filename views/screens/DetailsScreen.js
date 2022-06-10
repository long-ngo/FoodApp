import { View, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../consts/colors';
import { CardFoodIngredients } from '../components/CardFoodIngredients';
import { CardStepFood } from '../components/CardStepFood';
import { useEffect, useState } from 'react';
import GoBack from '../components/GoBack';

function DetailsScreen({ route, navigation }) {
  const { name, image, time, ingredients, step } = route.params;
  const [ingredient, setIngredient] = useState([]);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    const ingredientsArray = ingredients.split('&').map((item) => item.trim());
    const stepArray = Object.entries(step);
    setIngredient(ingredientsArray);
    setSteps(stepArray);
    return () => {
      setIngredient([]);
      setSteps([]);
    };
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.brownLight, flex: 1 }}>
      <GoBack name={name} navigation={navigation} />
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
            title={name}
            time={time}
            ingredient={ingredient}
          />
        </View>
        <View
          style={{ marginHorizontal: 20, paddingVertical: 20, marginTop: -100 }}
        >
          {steps.map((item, index) => (
            <View style={{ marginTop: 20 }} key={item[0]}>
              <CardStepFood
                numberStep={index + 1}
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
