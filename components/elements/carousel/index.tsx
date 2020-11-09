import React, { ReactChild } from 'react';
import Carousel from 'react-native-snap-carousel';
import { Dimensions, View } from 'react-native';

import theme from '../../../theme';
import Wrapper from './styled';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 2 * parseFloat(theme.paddings.small);

type CarouselItem = any;

type SharedCarouselProps = {
  selectedItemIndex: number;
  swipeCallback?: (index: number) => void;
  swipeStartCallback?: (index: number) => void;
  data: CarouselItem[];
  renderItem: (data: CarouselItem) => ReactChild;
};

const SharedCarousel = ({
  selectedItemIndex,
  swipeCallback,
  swipeStartCallback,
  data,
  renderItem
}: SharedCarouselProps) => {
  if (data.length === 0) return null;

  // https://github.com/archriss/react-native-snap-carousel/issues/496
  return (
    <Wrapper>
      <Carousel
        removeClippedSubviews={false}
        data={data}
        renderItem={renderItem}
        firstItem={selectedItemIndex}
        sliderWidth={width}
        itemWidth={CARD_WIDTH}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        onBeforeSnapToItem={swipeStartCallback}
        onSnapToItem={swipeCallback}
        contentContainerCustomStyle={{
          minWidth: width * data.length
        }}
      />
    </Wrapper>
  );
};

export default SharedCarousel;
