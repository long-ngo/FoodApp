import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../consts/colors';

function CardFoodIngredients() {
  return (
    <TouchableOpacity activeOpacity={0.99}>
      <View
        style={{
          backgroundColor: COLORS.white,
          paddingHorizontal: 20,
          paddingVertical: 20,
          borderRadius: 10,
          elevation: 1
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={{ fontSize: 22 }}>Toast with egg & avocado</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons name="access-time" color={COLORS.grey} />
            <Text style={{ fontSize: 15, color: COLORS.grey }}>15 min</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10
          }}
        >
          <View>
            <Text style={{ fontSize: 18 }}>Ingredients</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <View style={{ marginRight: 15 }}>
              <Text style={{ fontSize: 18 }}>Servings</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity activeOpacity={0.8}>
                <View
                  style={{
                    backgroundColor: COLORS.light,
                    width: 28,
                    height: 28,
                    borderRadius: 15,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <MaterialIcons
                    name="add"
                    size={28}
                    color={COLORS.greyLight}
                  />
                </View>
              </TouchableOpacity>
              <Text style={{ fontSize: 18, marginHorizontal: 8 }}>1</Text>
              <TouchableOpacity activeOpacity={0.8}>
                <View
                  style={{
                    backgroundColor: COLORS.light,
                    width: 28,
                    height: 28,
                    borderRadius: 15,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <MaterialCommunityIcons
                    name="minus"
                    size={28}
                    color={COLORS.greyLight}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10
            }}
          >
            <View
              style={{
                backgroundColor: COLORS.primary,
                width: 4,
                height: 22
              }}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 17, color: COLORS.greyLight }}>
                1 egg
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10
            }}
          >
            <View
              style={{
                backgroundColor: COLORS.primary,
                width: 4,
                height: 22
              }}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 17, color: COLORS.greyLight }}>
                1 avacado
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10
            }}
          >
            <View
              style={{
                backgroundColor: COLORS.primary,
                width: 4,
                height: 22
              }}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 17, color: COLORS.greyLight }}>
                1 toast
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10
            }}
          >
            <View
              style={{
                backgroundColor: COLORS.primary,
                width: 4,
                height: 22
              }}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 17, color: COLORS.greyLight }}>
                1 spoon of sunflower all
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10
            }}
          >
            <View
              style={{
                backgroundColor: COLORS.primary,
                width: 4,
                height: 22
              }}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 17, color: COLORS.greyLight }}>
                2 spoon of sunflower all
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export { CardFoodIngredients };
