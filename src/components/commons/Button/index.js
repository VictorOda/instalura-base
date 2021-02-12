import styled, { css, ThemeConsumer } from 'styled-components'
import get from 'lodash/get'
import { TextStyleVariantsMap } from '../../foundation/Text' 

const ButtonGhost = css`
    color: ${(props) => get(props.theme, `colors.${props.variant}.color`)};
    background: transparent;
`
const ButtonDefault = css `
    color: ${(props) => get(props.theme, `colors.${props.variant}.contrastText`)};
    background-color: ${(props) => get(props.theme, `colors.${props.variant}.color`)};
`

export const Button = styled.button`
    border: 0;
    cursor: pointer;
    padding: 12px 26px;
    font-weight: bold;
    opacity: 1;
    border-radius: ${(props) => props.theme.borderRadius};
    transition: ${({ theme }) => theme.transition};

    ${TextStyleVariantsMap.smallestException}

    ${function(props) {
        return props.ghost ? ButtonGhost : ButtonDefault;
    }}

    &:hover,
    &:focus {
        opacity: .5;
    }
`;
