import React from 'react';
import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import styled from 'styled-components';
import Text from '../../foundation/Text';

const FilterOption = styled.div`
  display: flex;
  flex-direction: column;
`;

const FilterImage = styled.img`
  height: auto;
  width: 112px;
  margin: 8px 0;
`;

// eslint-disable-next-line react/prop-types
export default function FilterCarousel({ imageUrl }) {
  return (
    <Carousel
      plugins={[
        'infinite',
        {
          resolve: slidesToShowPlugin,
          options: {
            numberOfSlides: 3,
          },
        },
      ]}
    >
      <FilterOption>
        <FilterImage src={imageUrl} alt="Filter 1" />
        <Text
          variant="paragraph1"
          tag="span"
          color="tertiaryLight"
          textAlign="center"
        >
          Filter 1
        </Text>
      </FilterOption>
      <FilterOption>
        <FilterImage src={imageUrl} alt="Filter 2" />
        <Text
          variant="paragraph1"
          tag="span"
          color="tertiaryLight"
          textAlign="center"
        >
          Filter 2
        </Text>
      </FilterOption>
      <FilterOption>
        <FilterImage src={imageUrl} alt="Filter 2" />
        <Text
          variant="paragraph1"
          tag="span"
          color="tertiaryLight"
          textAlign="center"
        >
          Filter 3
        </Text>
      </FilterOption>
    </Carousel>
  );
}
