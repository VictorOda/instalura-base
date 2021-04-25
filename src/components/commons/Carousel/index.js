import React from 'react';
import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import styled from 'styled-components';
import Text from '../../foundation/Text';

const FilterOption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 112px;
`;

const FilterImage = styled.img`
  height: 100%;
  width: 112px;
`;

const FilterFigure = styled.figure`
  display: flex;
  height: min-content;
  width: min-content;
`;

// eslint-disable-next-line react/prop-types
export default function FilterCarousel({ imageUrl, filterOption, setFilterOption }) {
  function onChange(value) {
    setFilterOption(value);
  }

  return (
    <Carousel
      value={filterOption}
      onChange={onChange}
      plugins={[
        'centered',
        {
          resolve: slidesToShowPlugin,
          options: {
            numberOfSlides: 3,
          },
        },
      ]}
    >
      <FilterOption>
        <FilterFigure className="filter-normal">
          <FilterImage src={imageUrl} alt="Normal" />
        </FilterFigure>
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
        <FilterFigure className="filter-inkwell">
          <FilterImage src={imageUrl} alt="Inkwell" />
        </FilterFigure>
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
        <FilterFigure className="filter-kelvin">
          <FilterImage src={imageUrl} alt="Kelvin" />
        </FilterFigure>
        <Text
          variant="paragraph1"
          tag="span"
          color="tertiaryLight"
          textAlign="center"
        >
          Kelvin
        </Text>
      </FilterOption>
      <FilterOption>
        <FilterFigure className="filter-maven">
          <FilterImage src={imageUrl} alt="Maven" />
        </FilterFigure>
        <Text
          variant="paragraph1"
          tag="span"
          color="tertiaryLight"
          textAlign="center"
        >
          Maven
        </Text>
      </FilterOption>
      <FilterOption>
        <FilterFigure className="filter-xpro-ii">
          <FilterImage src={imageUrl} alt="X-Pro II" />
        </FilterFigure>
        <Text
          variant="paragraph1"
          tag="span"
          color="tertiaryLight"
          textAlign="center"
        >
          X-Pro II
        </Text>
      </FilterOption>
    </Carousel>
  );
}
