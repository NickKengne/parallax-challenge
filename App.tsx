import TopHeader from 'components/TopHeader';
import { StatusBar, SafeAreaView, View, RefreshControl, Animated, Text } from 'react-native';

import './global.css';
import DisplayPatrimoine from 'components/DisplayPatrimoine';
import WarningAuthComponent from 'components/WarningAuthComponent';
import { useEffect, useRef, useState } from 'react';
import NewsCardCarousel from 'components/NewsCardCarousel';

export default function App() {
  const [refreshing, setRefreshing] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  useEffect(() => {
    const subscription = scrollY.addListener((event) => {
      const scrollValue = event.value;
      
      if (scrollValue > 15 && !isExpanded) {
        setIsExpanded(true);
      } else if (scrollValue <= 5 && isExpanded) {
        setIsExpanded(false);
      }
      
      if (scrollValue > 5 && !isScrolling) {
        setIsScrolling(true);
      } else if (scrollValue <= 2 && isScrolling) {
        setIsScrolling(false);
      }
    });

    return () => scrollY.removeListener(subscription);
  }, [isExpanded, isScrolling, scrollY]);

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar barStyle="light-content" />
      <View className="mx-auto w-[94%]">
        <TopHeader />
        <DisplayPatrimoine scrollY={scrollY} isExpanded={isExpanded} />
      </View>
      <Animated.ScrollView
        className={`${isScrolling ? 'border border-t-gray-700' : ''}`}
        refreshControl={
          <RefreshControl
            tintColor={'white'}
            size={12}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          { useNativeDriver: true}
        )}
        scrollEventThrottle={16}
      >
        <View className="mx-auto w-[99%]">
          <WarningAuthComponent />
          <NewsCardCarousel />
          <NewsCardCarousel />
          <NewsCardCarousel />
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}