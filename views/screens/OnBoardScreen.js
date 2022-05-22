import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../consts/colors';
import { PrimaryButton } from '../components/Button';

function OnBoardScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ height: 400 }}>
        <Image
          style={{
            width: '100%',
            resizeMode: 'contain',
            top: -150,
            borderColor: '#000'
          }}
          source={require('../../assets/onboardImage.png')}
        />
      </View>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 50,
          paddingBottom: 40
        }}
      >
        <View>
          <Text
            style={{ fontSize: 32, textAlign: 'center', fontWeight: 'bold' }}
          >
            Food App
          </Text>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              marginTop: 20,
              color: COLORS.grey
            }}
          >
            A place to share cooking knowledge anywhere
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row'
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.primary,
              width: 30,
              height: 12,
              borderRadius: 8,
              marginHorizontal: 5
            }}
          ></View>
          <View
            style={{
              backgroundColor: COLORS.grey,
              width: 12,
              height: 12,
              borderRadius: 6,
              marginHorizontal: 5
            }}
          ></View>
          <View
            style={{
              backgroundColor: COLORS.grey,
              width: 12,
              height: 12,
              borderRadius: 6,
              marginHorizontal: 5
            }}
          ></View>
        </View>
        <PrimaryButton
          title={'Getting Start'}
          onPress={() =>
            navigation.navigate({
              name: 'Home'
            })
          }
        />
      </View>
    </SafeAreaView>
  );
}

export default OnBoardScreen;