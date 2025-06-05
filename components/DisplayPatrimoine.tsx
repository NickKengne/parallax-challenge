import React, { useMemo } from 'react';
import { View, Text, Animated } from 'react-native';
import { ChevronDown, Info } from 'lucide-react-native';

interface DisplayPatrimoineProps {  
  scrollY: Animated.Value;
  isExpanded: boolean;
  patrimoine?: PatrimoineData;
}

interface PatrimoineData {
  amount: number;
  currency: string;
  dailyChange: number;
  dailyChangePercent: number;
}

const ANIMATION_CONFIG = {
  OPACITY_INPUT_RANGE: [0, 10, 50],
  OPACITY_OUTPUT_RANGE: [1, 0.4, 0],
  REVERSE_OPACITY_OUTPUT_RANGE: [0, 0.4, 1],
  TRANSLATE_INPUT_RANGE: [0, 40],
  TRANSLATE_Y_OUTPUT_RANGE: [0, -20],
  TRANSLATE_Y2_OUTPUT_RANGE: [0, 10],
  EXTRAPOLATE: 'clamp' as const,
};

const STYLES = {
  EXPANDED_PADDING: 10,
  COLLAPSED_PADDING: 30,
  CONTAINER_WIDTH: '90%',
} as const;

const DEFAULT_PATRIMOINE: PatrimoineData = {
  amount: 226,
  currency: '€',
  dailyChange: 0,
  dailyChangePercent: 0.00,
};

const DisplayPatrimoine: React.FC<DisplayPatrimoineProps> = ({ 
  scrollY, 
  isExpanded, 
  patrimoine = DEFAULT_PATRIMOINE 
}) => {
  
  const animatedValues = useMemo(() => ({
    opacity: scrollY.interpolate({
      inputRange: ANIMATION_CONFIG.OPACITY_INPUT_RANGE,
      outputRange: ANIMATION_CONFIG.OPACITY_OUTPUT_RANGE,
      extrapolate: ANIMATION_CONFIG.EXTRAPOLATE,
    }),
    reverseOpacity: scrollY.interpolate({
      inputRange: ANIMATION_CONFIG.OPACITY_INPUT_RANGE,
      outputRange: ANIMATION_CONFIG.REVERSE_OPACITY_OUTPUT_RANGE,
      extrapolate: ANIMATION_CONFIG.EXTRAPOLATE,
    }),
    translateY: scrollY.interpolate({
      inputRange: ANIMATION_CONFIG.TRANSLATE_INPUT_RANGE,
      outputRange: ANIMATION_CONFIG.TRANSLATE_Y_OUTPUT_RANGE,
      extrapolate: ANIMATION_CONFIG.EXTRAPOLATE,
    }),
    translateY2: scrollY.interpolate({
      inputRange: ANIMATION_CONFIG.TRANSLATE_INPUT_RANGE,
      outputRange: ANIMATION_CONFIG.TRANSLATE_Y2_OUTPUT_RANGE,
      extrapolate: ANIMATION_CONFIG.EXTRAPOLATE,
    }),
  }), [scrollY]);

  const containerStyle = useMemo(() => ({
    paddingVertical: isExpanded ? STYLES.EXPANDED_PADDING : STYLES.COLLAPSED_PADDING,
    marginTop: isExpanded ? STYLES.EXPANDED_PADDING : 0,
    transform: [{ translateY: animatedValues.translateY }],
  }), [isExpanded, animatedValues.translateY]);

  const AmountDisplay = ({ 
    amount, 
    currency, 
    textSize = 'text-5xl' 
  }: { 
    amount: number; 
    currency: string; 
    textSize?: string;
  }) => (
    <View className="flex-row items-center gap-2">
      <Text className={`${textSize} font-bold text-white`}>{amount}</Text>
      <Text className={`${textSize} font-bold text-white`}>{currency}</Text>
    </View>
  );

  const ChangeDisplay = ({ 
    change, 
    changePercent, 
    textSize = 'text-xl' 
  }: { 
    change: number; 
    changePercent: number; 
    textSize?: string;
  }) => (
    <View className="flex-row items-center gap-2">
      <Text className={`${textSize} font-bold text-white`}>
        {change} €
      </Text>
      <View className="flex-row items-center gap-2 bg-zinc-800 p-1 rounded">
        <Text className={`${textSize} font-bold text-white`}>
          {changePercent.toFixed(2)} %
        </Text>
      </View>
      <Info size={20} color="#eee" strokeWidth={1.5} />
    </View>
  );

  const CompactView = () => (
    <Animated.View
      className="flex-row items-center justify-between"
      style={{ 
        opacity: animatedValues.reverseOpacity, 
        transform: [{ translateY: animatedValues.translateY2 }],
        display: isExpanded ? 'flex' : 'none',
      }}
    >
      <AmountDisplay 
        amount={patrimoine.amount} 
        currency={patrimoine.currency} 
        textSize="text-3xl" 
      />
      <View className="flex-row items-center gap-4">
        <ChangeDisplay 
          change={patrimoine.dailyChange}
          changePercent={patrimoine.dailyChangePercent}
          textSize="text-md"
        />
      </View>
    </Animated.View>
  );

  const ExpandedView = () => (
    <>
      <Animated.View 
        className="flex-row items-center gap-2" 
        style={{ 
          opacity: animatedValues.opacity,
          display: !isExpanded ? 'flex' : 'none',
        }}
      >
        <Text className="text-xl font-bold text-gray-300">Patrimoine brut</Text>
        <ChevronDown size={20} color="white" />
      </Animated.View>

      <Animated.View
        className="flex-col gap-2"
        style={{ 
          opacity: animatedValues.opacity,
          display: !isExpanded ? 'flex' : 'none',
        }}
      >
        <AmountDisplay 
          amount={patrimoine.amount} 
          currency={patrimoine.currency} 
        />
        
        <View className="flex-row items-center gap-4">
          <View className="flex-row items-center gap-2 rounded-full border border-gray-700 bg-transparent px-4 py-2">
            <Text className="text-xl font-bold text-gray-300">1 Jour</Text>
            <ChevronDown size={20} color="gray" />
          </View>
          <ChangeDisplay 
            change={patrimoine.dailyChange}
            changePercent={patrimoine.dailyChangePercent}
          />
        </View>
      </Animated.View>
    </>
  );

  return (
    <Animated.View
      className="flex-col justify-between gap-4 mx-auto"
      style={[
        { width: STYLES.CONTAINER_WIDTH },
        containerStyle,
      ]}
    >
      <CompactView />
      <ExpandedView />
    </Animated.View>
  );
};

export default React.memo(DisplayPatrimoine);