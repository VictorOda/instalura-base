import React from 'react'
import { MenuWrapper } from './styles/MenuWrapper'
import { Logo } from '../../../theme/Logo'
import { Button } from '../Button'

export default function Menu() {
    const links =[
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
        }
    ]

    return (
      <MenuWrapper>
        <MenuWrapper.LeftSide>
          <Logo />
        </MenuWrapper.LeftSide>
        <MenuWrapper.CentralSide>
          {
            links.map((link) => {
                return (
                    <li key={link.url}>
                        <a href={link.url}>
                            {link.text}
                        </a>
                    </li>
                )
            })
          }
        </MenuWrapper.CentralSide>
        <MenuWrapper.RightSide>
          <Button ghost variant="secondary.main">
              Entrar
          </Button>
          <Button variant="primary.main">
              Cadastrar
          </Button>
        </MenuWrapper.RightSide>
      </MenuWrapper>
    )
  }
  