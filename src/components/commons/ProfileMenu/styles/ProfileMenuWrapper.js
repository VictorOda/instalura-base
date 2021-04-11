import styled, { css } from 'styled-components';
import get from 'lodash/get';
import { breakpointsMedia } from '../../../../theme/utils/breakpointsMedia';

export const MenuWrapper = styled.nav`
  font-family: 'Rubik', sans-serif;
  display: flex;
  position: fixed;
  top: auto;
  bottom: 0;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  background-color: ${(props) => get(props.theme, `colors.background.${props.theme.mode}.color`)};
  border-radius: 24px 24px 0px 0px;
  width: 100%;

  ${breakpointsMedia({
    sm: css`
      justify-content: flex-start;
      margin-left: auto;
      margin-right: auto;
      
      box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.0);
      border-radius: 0;
      padding: 0px 18px;
    `,
    md: css`
      border-radius: 0;
      position: fixed;
      top: 0;
      bottom: auto;
      left: 0;
      right: 0;
      padding: 4px 28px;
      box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
    `,
  })}
`;

MenuWrapper.LeftSide = styled.div`
  display: none;
  padding: 0;
  margin: 0;
  order: 1;

  ${breakpointsMedia({
    md: css`
      /* display: inline; */
      display: inline;
      width: 131px;
      height: 32px;
      order: initial;
      padding-right: 16px;
    `,
  })}
`;

MenuWrapper.RightSide = styled.div`
  padding: 0;
  margin: 0;
  display: none;
  flex: 1;
  order: 2;
  justify-content: flex-end;
  ${breakpointsMedia({
    md: css`
      display: flex;
      order: initial;
      align-items: center;
      flex: row;
    `,
  })}
`;

MenuWrapper.Mobile = styled.div`
  margin: 0;
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 0px 64px;
  height: 64px;

  ${breakpointsMedia({
    md: css`
      display: none;
      order: initial;
    `,
  })}
`;
