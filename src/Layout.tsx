import { Header, OrganizationSelectModal, loadable } from '@library/react-toolkit'
import { Layout, Spin } from 'antd'
import * as React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router'
import styled from 'styled-components'

import { State } from './store'

import Dashboard from './Dashboard'
import NavMenu from './NavMenu'

const FullRedirect = styled.div`
  height: calc(100% - ${(props) => props.theme.footerHeight}px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`

const MainLayout = () => {
  const isLoading = useSelector((s: State) =>
    loadable.isLoading(s.prosperus.organization.currentWorkspace)
  )

  return isLoading ? (
    <>
      <OrganizationSelectModal />
      <FullRedirect>
        <Spin spinning={true} />
      </FullRedirect>
    </>
  ) : (
    <Layout>
      <Header
        logo={
          // TODO: we need to set a logo for the Analytics module here
          undefined
        }
      >
        <NavMenu />
      </Header>
      <Layout.Content style={{ padding: '0 50px', marginTop: 48, marginBottom: 48 }}>
        <Switch>
          <Route path="/" exact={true} component={Dashboard} />
        </Switch>
      </Layout.Content>
    </Layout>
  )
}
export default MainLayout
