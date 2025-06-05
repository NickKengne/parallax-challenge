import React, { JSX, useCallback, useMemo, useRef, useState } from 'react';
import { StatusBar, SafeAreaView, View, RefreshControl, Animated } from 'react-native';

import './global.css';
import TopHeader from 'components/TopHeader';
import DisplayPatrimoine from 'components/DisplayPatrimoine';
import WarningAuthComponent from 'components/WarningAuthComponent';
import NewsCardCarousel from 'components/NewsCardCarousel';
import { useScrollAnimation } from 'hooks/useScrollAnimation';

const SCROLL_CONFIG = {
  EXPAND_THRESHOLD: 20,
  COLLAPSE_THRESHOLD: 5,
  SCROLL_START_THRESHOLD: 5,
  SCROLL_END_THRESHOLD: 2,
  THROTTLE: 16,
  REFRESH_DURATION: 2000,
} as const;

const LAYOUT_CONFIG = {
  HEADER_WIDTH: '94%',
  CONTENT_WIDTH: '99%',
} as const;

export default function App(): JSX.Element {
  const [refreshing, setRefreshing] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  
  const { isExpanded, isScrolling } = useScrollAnimation(scrollY, SCROLL_CONFIG);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, SCROLL_CONFIG.REFRESH_DURATION);
  }, []);

  const scrollViewProps = useMemo(() => ({
    refreshControl: (
      <RefreshControl
        tintColor="white"
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    ),
    onScroll: Animated.event(
      [{ nativeEvent: { contentOffset: { y: scrollY } } }],
      { useNativeDriver: true }
    ),
    scrollEventThrottle: SCROLL_CONFIG.THROTTLE,
    showsVerticalScrollIndicator: false,
  }), [refreshing, handleRefresh, scrollY]);

  const scrollViewStyle = useMemo(() => ({
    borderTopWidth: isScrolling ? 1 : 0,
    borderTopColor: '#374151',
  }), [isScrolling]);

  const newsCarousels = useMemo(() => 
    Array.from({ length: 7 }, (_, index) => (
      <NewsCardCarousel key={`carousel-${index}`} />
    )), 
  []);

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar barStyle="light-content" backgroundColor="black" />
      
      <View className="mx-auto" style={{ width: LAYOUT_CONFIG.HEADER_WIDTH }}>
        <TopHeader />
        <DisplayPatrimoine 
          scrollY={scrollY} 
          isExpanded={isExpanded} 
        />
      </View>

      <Animated.ScrollView
        className="flex-1"
        style={scrollViewStyle}
        {...scrollViewProps}
      >
        <View className="mx-auto" style={{ width: LAYOUT_CONFIG.CONTENT_WIDTH }}>
          <WarningAuthComponent />
          {newsCarousels}
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}