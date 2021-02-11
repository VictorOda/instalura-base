import { loadGetInitialProps } from 'next/dist/next-server/lib/utils'
import React from 'react'
import { MenuWrapper } from './styles/MenuWrapper'
import { Logo } from '../../../theme/Logo'

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
                    <li>
                        <a href={link.url}>
                            {link.text}
                        </a>
                    </li>
                )
            })
          }
        </MenuWrapper.CentralSide>
        <MenuWrapper.RightSide>
          <button>
              Entrar
          </button>
          <button>
              Cadastrar
          </button>
        </MenuWrapper.RightSide>
      </MenuWrapper>
    )
  }
  