import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import get from 'lodash/get';

const FooterWrapper = styled.footer`
  padding: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px; 
  padding-right: 28px;
  padding-left: 28px;
  img {
    width: 58px;
    margin-right: 23px;
    color: red;
  }

  p {
    color: ${({ theme }) => get(theme, `colors.tertiaryLight.${theme.mode}.contrastText`)};
  }

  a {
    color: ${({ theme }) => get(theme, `colors.tertiaryMain.${theme.mode}.contrastText`)};
    text-decoration: none;
    transition: .3s;
    &:hover,
    &:focus {
      opacity: .5;
    }
  }
`;

export default function Footer({ mode }, props) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FooterWrapper {...props}>
      <a href="https://www.alura.com.br/">
        <img src={mode === 'main' ? '/images/aluraMain.svg' : '/images/aluraDark.svg'} alt="Logo Alura" />
      </a>
      <p>
        Orgulhosamente criado durante
        {' '}
        o
        {' '}
        <a href="https://www.alura.com.br/">
          <span>Bootcamp Alura JAM Stack</span>
        </a>
      </p>
    </FooterWrapper>
  );
}

Footer.propTypes = {
  mode: PropTypes.string.isRequired,
};
