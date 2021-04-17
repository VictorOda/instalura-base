import styled from 'styled-components';
import get from 'lodash/get';
import { propToStyle } from '../../../../theme/utils/propToStyle';

export const Box = styled.div`
  ${propToStyle('display')}
  ${propToStyle('flexDirection')}
  ${propToStyle('justifyContent')}
  ${propToStyle('flex')}
  ${propToStyle('flexWrap')}
  ${propToStyle('backgroundImage')}
  ${propToStyle('backgroundRepeat')}
  ${propToStyle('backgroundPosition')}
  ${propToStyle('boxShadow')}
  ${propToStyle('padding')}
  ${propToStyle('alignItems')}
  ${propToStyle('position')}

  ${propToStyle('width')}
  ${propToStyle('maxWidth')}
  ${propToStyle('height')}
  ${propToStyle('listStyle')}
  ${propToStyle('margin')}
  ${propToStyle('marginLeft')}
  ${propToStyle('marginTop')}
  ${propToStyle('marginBottom')}
  ${propToStyle('marginRight')}
  ${propToStyle('padding')}
  ${({ theme, borderRadiusTheme }) => borderRadiusTheme && `border-radius: ${theme.borderRadius}`};
  ${propToStyle('borderRadius')}
  
  background-color: ${(props) => get(props.theme, `colors.background.${props.theme.mode}.color`)};
  ${propToStyle('backgroundColor')}
`;
