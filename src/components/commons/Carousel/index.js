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
        <figure className="filter-normal">
          <FilterImage src={imageUrl} alt="Normal" />
        </figure>
        <Text
          variant="paragraph1"
          tag="span"
          color="tertiaryLight"
          textAlign="center"
        >
          Normal
        </Text>
      </FilterOption>
      <FilterOption>
        <figure className="filter-inkwell">
          <FilterImage src={imageUrl} alt="Inkwell" />
        </figure>
        <Text
          variant="paragraph1"
          tag="span"
          color="tertiaryLight"
          textAlign="center"
        >
          Inkwell
        </Text>
      </FilterOption>
      <FilterOption>
        <figure className="filter-kelvin">
          <FilterImage src={imageUrl} alt="Kelvin" />
        </figure>
        <Text
          variant="paragraph1"
          tag="span"
          color="tertiaryLight"
          textAlign="center"
        >
          Kelvin
        </Text>
      </FilterOption>
    </Carousel>
  );
}
