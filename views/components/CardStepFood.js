import { View, Text, Image } from 'react-native';

function CardStepFood({ numberStep, description, image }) {
  return (
    <View>
      <View>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
          Bước {numberStep}
        </Text>
      </View>
      <View style={{ marginTop: 14 }}>
        <Text style={{ fontSize: 18, lineHeight: 28 }}>{description}</Text>
      </View>
      <View
        style={{
          borderRadius: 10,
          marginTop: 14
        }}
      >
        {!!image && (
          <Image
            source={{
              uri: image
            }}
            style={{ width: '100%', height: 150 }}
            resizeMode="cover"
          />
        )}
      </View>
    </View>
  );
}

export { CardStepFood };
