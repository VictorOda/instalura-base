import React from 'react';
import styled, { css } from 'styled-components';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import Link from '../Link';
import { TextStyleVariantsMap } from '../../foundation/Text';
import { breakpointsMedia } from '../../../theme/utils/breakpointsMedia';
import { propToStyle } from '../../../theme/utils/propToStyle';

const ButtonGhost = css`
  color: ${(props) => get(props.theme, `colors.${props.variant}.${props.theme.mode}.color`)};
  background: transparent;
`;
const ButtonDefault = css`
  color: ${(props) => get(props.theme, `colors.${props.variant}.${props.theme.mode}.contrastText`)};
  background-color: ${(props) => get(props.theme, `colors.${props.variant}.${props.theme.mode}.color`)};
`;

const ButtonWrapper = styled.button`
  border: 0;
  cursor: pointer;
  padding: 12px 26px;
  font-weight: bold;
  opacity: 1;
  border-radius: ${(props) => props.theme.borderRadius};
  transition: ${({ theme }) => theme.transition};
  outline: none;

  ${(props) => (props.ghost ? ButtonGhost : ButtonDefault)}

  &:hover,
  &:focus {
    opacity: .5;
  }
    
  ${breakpointsMedia({
    xs: css`
      ${TextStyleVariantsMap.smallestException}
    `,
    md: css`
      ${TextStyleVariantsMap.paragraph1}
    `,
  })}

  &:disabled {
    cursor: not-allowed;
    opacity: .2;
  }
  ${({ fullWidth }) => fullWidth && css`
    width: 100%;
  `};

  ${propToStyle('margin')}
  ${propToStyle('display')}
  ${propToStyle('padding')}
  ${propToStyle('height')}
  ${propToStyle('width')}
  ${propToStyle('position')}
  ${propToStyle('right')}
  ${propToStyle('borderRadius')}
`;

export function Button({ href, children, ...props }) {
  const hasHref = Boolean(href);
  const tag = hasHref ? Link : 'button';
  return (
    <ButtonWrapper
      as={tag}
      href={href}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </ButtonWrapper>
  );
}

Button.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node,
};

Button.defaultProps = {
  href: null,
  children: null,
};
