import { useEffect, useState, useCallback } from 'react';
import { Animated } from 'react-native';

interface ScrollConfig {
  EXPAND_THRESHOLD: number;
  COLLAPSE_THRESHOLD: number;
  SCROLL_START_THRESHOLD: number;
  SCROLL_END_THRESHOLD: number;
}

interface UseScrollAnimationReturn {
  isExpanded: boolean;
  isScrolling: boolean;
}

export const useScrollAnimation = (
  scrollY: Animated.Value,
  config: ScrollConfig
): UseScrollAnimationReturn => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const updateExpandedState = useCallback((scrollValue: number) => {
    setIsExpanded(prevExpanded => {
      if (scrollValue > config.EXPAND_THRESHOLD && !prevExpanded) {
        return true;
      }
      if (scrollValue <= config.COLLAPSE_THRESHOLD && prevExpanded) {
        return false;
      }
      return prevExpanded;
    });
  }, [config.EXPAND_THRESHOLD, config.COLLAPSE_THRESHOLD]);

  const updateScrollingState = useCallback((scrollValue: number) => {
    setIsScrolling(prevScrolling => {
      if (scrollValue > config.SCROLL_START_THRESHOLD && !prevScrolling) {
        return true;
      }
      if (scrollValue <= config.SCROLL_END_THRESHOLD && prevScrolling) {
        return false;
      }
      return prevScrolling;
    });
  }, [config.SCROLL_START_THRESHOLD, config.SCROLL_END_THRESHOLD]);

  useEffect(() => {
    const handleScroll = ({ value }: { value: number }) => {
      updateExpandedState(value);
      updateScrollingState(value);
    };

    const subscription = scrollY.addListener(handleScroll);

    return () => {
      scrollY.removeListener(subscription);
    };
  }, [scrollY, updateExpandedState, updateScrollingState]);

  return { isExpanded, isScrolling };
};