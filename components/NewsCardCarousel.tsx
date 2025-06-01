import React, { useRef } from 'react';
import { View, Text, FlatList, Animated, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const cards = [
  {
    id: '1',
    title: 'COMMUNAUTÉ FINARY',
    text: "Echangez avec d'autres investisseurs",
    // icon: require('../assets/chat-bubbles.png'),
  },
  {
    id: '2',
    title: 'COMMUNAUTÉ FINARY',
    text: "Echangez avec d'autres investisseurs",
    // icon: require('../assets/chat-bubbles.png'),
  },
  {
    id: '3',
    title: 'COMMUNAUTÉ FINARY',
    text: "Echangez avec d'autres investisseurs",
    // icon: require('../assets/chat-bubbles.png'),
  },
  {
    id: '4',
    title: 'COMMUNAUTÉ FINARY',
    text: "Echangez avec d'autres investisseurs",
    // icon: require('../assets/chat-bubbles.png'),
  },
  {
    id: '5',
    title: 'COMMUNAUTÉ FINARY',
    text: "Echangez avec d'autres investisseurs",
    // icon: require('../assets/chat-bubbles.png'),
  },
  
];

export default function NewsCardCarousel() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const CARD_WIDTH = 300;
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <View className="mt-4 p-[20px]">
      <View className="mb-4 flex-row items-center justify-between mx-auto w-[90%]">
        <Text className="text-2xl font-bold text-white">Fil d'actualités</Text>
        <View className="flex-row justify-center">
          {cards.map((_, i) => {
            const inputRange = [(i - 1) * CARD_WIDTH, i * CARD_WIDTH, (i + 1) * CARD_WIDTH];
            const dotScale = scrollX.interpolate({
              inputRange,
              outputRange: [1, 1.6, 1],
              extrapolate: 'clamp',
            });
            const dotOpacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.2, 1, 0.2],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={i}
                style={{
                  height: 2,
                  width: 10,
                  borderRadius: 2,
                  backgroundColor: '#A09FA6',
                  marginHorizontal: 4,
                  opacity: dotOpacity,
                  transform: [{ scale: dotScale }],
                }}
              />
            );
          })}
        </View>
      </View>
      <Animated.FlatList
        data={cards}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
            listener: (event) => {
              const offsetX = (event as any).nativeEvent.contentOffset.x;
              const newIndex = Math.round(offsetX / CARD_WIDTH);
              setActiveIndex(newIndex);
            },
          }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * CARD_WIDTH,
            index * CARD_WIDTH,
            (index + 1) * CARD_WIDTH,
          ];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.96, 1, 0.96],
            extrapolate: 'clamp',
          });
          const shadowOpacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.1, 0.35, 0.1],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              style={{
                transform: [{ scale }],
                shadowRadius: 16,
                marginRight: 16,
              }}
            >
              <LinearGradient
                colors={
                  index === activeIndex
                    ? ['#18171B', '#000']
                    : ['#232228', '#000']
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  borderRadius: 14,
                  width: CARD_WIDTH,
                  height: 120,
                  padding: 18,
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: '#A09FA6', fontWeight: 'bold', fontSize: 13 }}>
                    {item.title}
                  </Text>
                  <TouchableOpacity>
                    <Text style={{ color: '#A09FA6', fontWeight: 'bold', fontSize: 18 }}>×</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, flex: 1 }}>
                    {item.text}
                  </Text>
                  {/* <Image source={item.icon} style={{ width: 48, height: 48, marginLeft: 8 }} /> */}
                </View>
              </LinearGradient>
            </Animated.View>
          );
        }}
      />
    </View>
  );
}
