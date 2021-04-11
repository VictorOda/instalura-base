import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { get } from 'lodash';
import { MenuWrapper } from './styles/ProfileMenuWrapper';
import { LogoMain } from '../../../theme/LogoMain';
import { LogoDark } from '../../../theme/LogoDark';
import { Button } from '../Button';

const Search = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchIcon = styled.img`
  position: absolute;
  left: 12px;
`;

const SearchBar = styled.input`
  border: 1px solid ${(props) => get(props.theme, `colors.tertiaryLight.${props.theme.mode}.color`)};
  border-radius: ${(props) => props.theme.borderRadius};
  height: 44px;
  padding-left: 44px;
  padding-right: 8px;
  outline: none;
`;

export default function ProfileMenu({ mode, toggleMode, onCadastrarClick }) {
  return (
    <MenuWrapper>
      <MenuWrapper.LeftSide>
        {mode === 'main' ? <LogoMain /> : <LogoDark />}
      </MenuWrapper.LeftSide>
      <MenuWrapper.RightSide>
        <Search>
          <SearchIcon src={mode === 'main' ? '/icons/search2.svg' : '/iconsDark/search.svg'} alt="Home Icon" />
          <SearchBar type="text" placeholder="Pesquisar" />
        </Search>
        <Button ghost variant="secondary" padding="0 8px">
          <img src={mode === 'main' ? '/icons/plus.svg' : '/iconsDark/plus.svg'} alt="Home Icon" />
        </Button>
        <Button ghost variant="secondary" href="/app/profile" padding="0 8px">
          <img src={mode === 'main' ? '/icons/home.svg' : '/iconsDark/home.svg'} alt="Home Icon" />
        </Button>
        <Button ghost variant="secondary" href="/app/profile" padding="0 8px">
          <img src={mode === 'main' ? '/icons/heart.svg' : '/iconsDark/heart.svg'} alt="Home Icon" />
        </Button>
        <Button ghost variant="secondary" href="/app/profile" padding="0 8px">
          PROFILE
        </Button>
      </MenuWrapper.RightSide>
      <MenuWrapper.Mobile>
        <Button ghost variant="secondary" href="/app/profile">
          <img src={mode === 'main' ? '/icons/home.svg' : '/iconsDark/home.svg'} alt="Home Icon" />
        </Button>
        <Button ghost variant="secondary">
          <img src={mode === 'main' ? '/icons/search.svg' : '/iconsDark/search.svg'} alt="Home Icon" />
        </Button>
        <Button ghost variant="secondary">
          <img src={mode === 'main' ? '/icons/plus.svg' : '/iconsDark/plus.svg'} alt="Home Icon" />
        </Button>
        <Button ghost variant="secondary" href="/app/profile">
          <img src={mode === 'main' ? '/icons/heart.svg' : '/iconsDark/heart.svg'} alt="Home Icon" />
        </Button>
        <Button ghost variant="secondary" href="/app/profile">
          PROFILE
        </Button>
      </MenuWrapper.Mobile>
    </MenuWrapper>
  );
}

ProfileMenu.propTypes = {
  mode: PropTypes.string.isRequired,
  toggleMode: PropTypes.func.isRequired,
  onCadastrarClick: PropTypes.func.isRequired,
};
