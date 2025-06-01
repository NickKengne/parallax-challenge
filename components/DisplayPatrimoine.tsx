import { View, Text, Animated } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ChevronDown, Info } from 'lucide-react-native';
import { useAnimatedStyle } from 'react-native-reanimated';

const DisplayPatrimoine = ({ scrollY, isExpanded }: { scrollY: Animated.Value, isExpanded: boolean }) => {
  const opacityRange = scrollY.interpolate({
    inputRange: [0, 20, 50],
    outputRange: [1, 0.4, 0],
    extrapolate: 'clamp',
  });
  const reverseOpacityRange = scrollY.interpolate({
    inputRange: [0, 20, 50],
    outputRange: [0, 0.4, 1],
    extrapolate: 'clamp',
  });
  const translateYRange = scrollY.interpolate({
    inputRange: [0, 20],
    outputRange: [0, -20],
    extrapolate: 'clamp',
  });
  const translateYRange2 = scrollY.interpolate({
    inputRange: [0, 20],
    outputRange: [0, 10],
    extrapolate: 'clamp',
  });


  return (
    <Animated.View
      className={`flex-col justify-between gap-4 ${isExpanded ? 'py-[10px] mt-[10px]' : 'py-[30px]'}  mx-auto w-[90%]`}
      style={{ transform: [{ translateY: translateYRange }] }}>
      <Animated.View
        className={`flex-row items-center justify-between ${isExpanded ? 'flex' : 'hidden'}`}
        style={{ opacity: reverseOpacityRange, transform: [{translateY: translateYRange2}] }}>
        <Animated.View className="flex-row items-center gap-2">
          <Text className="text-3xl font-bold text-white">226</Text>
          <Text className="text-3xl font-bold text-white">€</Text>
        </Animated.View>
        <Animated.View className="flex-row items-center gap-4">
          <Animated.View className="flex-row items-center gap-2">
            <Text className="text-md font-bold text-white">0 €</Text>
            <Animated.View className="flex-row items-center gap-2 bg-zinc-800 p-1">
              <Text className="text-md font-bold text-white">0,00 %</Text>
            </Animated.View>
            <Info size={20} color="#eee" strokeWidth={1.5} />
          </Animated.View>
        </Animated.View>
      </Animated.View>
      <Animated.View className={`flex-row items-center gap-2 ${!isExpanded ? 'flex' : 'hidden'}`} style={{ opacity: opacityRange }}>
        <Text className="text-xl font-bold text-gray-300">Patrimoine brut</Text>
        <ChevronDown size={20} color="white" />
      </Animated.View>
      <Animated.View
        className={`flex-col gap-2 ${!isExpanded ? 'flex' : 'hidden'}`}
        style={{ opacity: opacityRange }}>
        <Animated.View className="flex-row items-center gap-2" style={{ opacity: opacityRange }}>
          <Text className="text-5xl font-bold text-white">226</Text>
          <Text className="text-5xl font-bold text-white">€</Text>
        </Animated.View>
        <Animated.View className="flex-row items-center gap-4" style={{ opacity: opacityRange }}>
          <Animated.View className="flex-row items-center gap-2 rounded-full border border-gray-700 bg-transparent px-4 py-2">
            <Text className="text-xl font-bold text-gray-300">1 Jour</Text>
            <ChevronDown size={20} color="gray" />
          </Animated.View>
          <Animated.View className="flex-row items-center gap-2">
            <Text className="text-xl font-bold text-white">0 €</Text>
            <Animated.View className="flex-row items-center gap-2 bg-zinc-800 p-1">
              <Text className="text-xl font-bold text-white">0,00 %</Text>
            </Animated.View>
            <Info size={20} color="#eee" strokeWidth={1.5} />
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

export default DisplayPatrimoine;
