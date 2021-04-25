import React from 'react';
import PropTypes from 'prop-types';
import { MenuWrapper } from './styles/MenuWrapper';
import { LogoMain } from '../../../theme/LogoMain';
import { LogoDark } from '../../../theme/LogoDark';
import { Button } from '../Button';
import Text from '../../foundation/Text';

export default function Menu({ mode, onCadastrarClick }) {
  const links = [
    {
      text: 'Home',
      url: '/',
    },
    {
      text: 'Perguntas Frequentes',
      url: '/faq',
    },
    {
      text: 'Sobre',
      url: '/sobre',
    },
  ];

  return (
    <MenuWrapper>
      <MenuWrapper.LeftSide>
        {mode === 'main' ? <LogoMain /> : <LogoDark />}
      </MenuWrapper.LeftSide>
      <MenuWrapper.CentralSide>
        {
            links.map((link) => (
              <li key={link.url}>
                <Text tag="a" variant="smallestException" href={link.url}>
                  {link.text}
                </Text>
              </li>
            ))
          }
      </MenuWrapper.CentralSide>
      <MenuWrapper.RightSide>
        {/* <Button ghost variant="secondary" onClick={toggleMode}>
          Mode
        </Button> */}
        <Button ghost variant="secondary" href="/app/login">
          Entrar
        </Button>
        <Button variant="primary" onClick={onCadastrarClick}>
          Cadastrar
        </Button>
      </MenuWrapper.RightSide>
    </MenuWrapper>
  );
}

Menu.propTypes = {
  mode: PropTypes.string.isRequired,
  onCadastrarClick: PropTypes.func.isRequired,
};
