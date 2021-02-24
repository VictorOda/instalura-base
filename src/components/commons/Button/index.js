import styled, { css } from 'styled-components';
import get from 'lodash/get';
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

export const Button = styled.button`
    border: 0;
    cursor: pointer;
    padding: 12px 26px;
    font-weight: bold;
    opacity: 1;
    border-radius: ${(props) => props.theme.borderRadius};
    transition: ${({ theme }) => theme.transition};

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
`;
