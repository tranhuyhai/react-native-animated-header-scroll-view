import React, { forwardRef } from 'react';
import { Animated, FlatList } from 'react-native';
import type { AnimatedFlatListViewProps } from '../types';
import AnimatedNavbar from './AnimatedNavbar';
import { HEADER_HEIGHT, IMG_HEADER_HEIGHT } from '../constants';
import { useAnimateScrollView } from '../hooks/useAnimateScrollView';
import { AnimatedHeader } from './AnimatedHeader';

export const AnimatedFlatList = forwardRef<FlatList, AnimatedFlatListViewProps>(
  (
    {
      headerMaxHeight,
      topBarHeight,
      topBarElevation,
      disableScale,
      TopNavBarComponent,
      HeaderNavbarComponent,
      headerImage,
      imageStyle,
      HeaderComponent,
         styleNavbar,
      ...props
    }: AnimatedFlatListViewProps,
    ref
  ) => {
    const imageHeight = headerMaxHeight || IMG_HEADER_HEIGHT;
    const headerNavHeight = topBarHeight || HEADER_HEIGHT;
    const headerElevation = topBarElevation || 0;
    const [scroll, onScroll, scale, translateYDown, translateYUp] =
      useAnimateScrollView(imageHeight, disableScale);

    return (
      <>
        <Animated.FlatList
          ref={ref}
          {...props}
          onScroll={onScroll}
          ListHeaderComponent={
            <AnimatedHeader
              HeaderComponent={HeaderComponent}
              headerImage={headerImage}
              imageStyle={imageStyle}
              imageHeight={imageHeight}
              translateYDown={translateYDown}
              translateYUp={translateYUp}
              scale={scale}
            />
          }
        />
        <AnimatedNavbar
          headerElevation={headerElevation}
          headerHeight={headerNavHeight}
          scroll={scroll}
          imageHeight={imageHeight}
          OverflowHeaderComponent={HeaderNavbarComponent}
          TopNavbarComponent={TopNavBarComponent}
             styleNavbar={styleNavbar}
        />
      </>
    );
  }
);
