import { View, Text, Image } from 'react-native';

function CardStepFood({ num, text, src }) {
  return (
    <View>
      <View>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Step {num}</Text>
      </View>
      <View style={{ marginTop: 14 }}>
        <Text style={{ fontSize: 18, lineHeight: 28 }}>{text}</Text>
      </View>
      <View
        style={{
          elevation: 1,
          borderRadius: 10,
          marginTop: 14
        }}
      >
        {src && (
          <Image
            source={src}
            style={{ width: '100%', height: 150 }}
            resizeMode="cover"
          />
        )}
      </View>
    </View>
  );
}

export { CardStepFood };
