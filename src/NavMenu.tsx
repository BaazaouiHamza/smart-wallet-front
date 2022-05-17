import { Menu } from 'antd'
import { push } from 'connected-react-router'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { matchPath } from 'react-router'
import styled from 'styled-components'
import { TranslatedMessage } from './translations/data'
import { NavLink } from 'react-router-dom'

const Nav = styled(Menu)`
  width: 500px;
  height: ${(props) => props.theme.headerHeight}px;
  background: ${(props) => props.theme.colors.primary};
  border: 0;
  & > li.ant-menu-item.ant-menu-item-selected,
  & > li.ant-menu-item.ant-menu-item-selected a,
  & > li.ant-menu-item.ant-menu-item-active,
  & > li.ant-menu-item.ant-menu-item-active a,
  & > li.ant-menu-submenu.ant-menu-item-selected,
  & > li.ant-menu-submenu.ant-menu-submenu-selected,
  & > li.ant-menu-submenu.ant-menu-submenu-active {
    background: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.primary};
  }
  & > li.ant-menu-item,
  & > li.ant-menu-item a,
  & > li.ant-menu-submenu {
    vertical-align: top;
    top: 0px;
    margin: 0 !important;
    height: ${(props) => props.theme.headerHeight}px;
    line-height: ${(props) => props.theme.headerHeight}px;
    font-size: 18px;
    background: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.white};
    & > .anticon {
      font-size: 18px;
    }
  }
  & > li.ant-menu-item {
    padding: 0 20px !important;
  }
  & > li.ant-menu-submenu > div {
    padding: 0 20px !important;
  }
`

const NavMenu = () => {
  const dispatch = useDispatch()
  const location = useSelector((s) => s.router.location)

  const page = matchPath(location.pathname, { path: '/', exact: true }) ? 'dashboard' : 'lost'

  return (
    <Nav
      mode="horizontal"
      selectedKeys={[page]}
      onSelect={({ key }) => (key === 'dashboard' ? dispatch(push('/')) : undefined)}
    >
      <Menu.Item key="RtpsList">
        <NavLink to="/rtpList">
          <TranslatedMessage id="RtpsList" />
        </NavLink>
      </Menu.Item>
      <Menu.Item key="CreateRtp">
        <NavLink to="/ttpList">Transaction Trigger Policy</NavLink>
      </Menu.Item>
    </Nav>
  )
}

export default NavMenu
