import React from 'react';
import { MenuWrapper } from './styles/MenuWrapper';
import { Logo } from '../../../theme/Logo';
import { Button } from '../Button';
import Text from '../../foundation/Text';
import theme from '../../../theme';

export default function Menu() {
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
  const toggleDarkMode = () => {
    if (theme.mode === 'dark') {
      theme.mode = 'main';
    } else {
      theme.mode = 'dark';
    }
  };
  return (
    <MenuWrapper>
      <MenuWrapper.LeftSide>
        <Logo />
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
        <Button ghost variant="secondary" onClick={toggleDarkMode}>
          Mode
        </Button>
        <Button ghost variant="secondary">
          Entrar
        </Button>
        <Button variant="primary">
          Cadastrar
        </Button>
      </MenuWrapper.RightSide>
    </MenuWrapper>
  );
}
