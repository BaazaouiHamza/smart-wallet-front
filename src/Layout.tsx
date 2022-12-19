import { Header, OrganizationSelectModal, loadable } from '@library/react-toolkit'
import { Layout, Spin } from 'antd'
import * as React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router'
import styled from 'styled-components'
import { ShowRoutineTransactionPolicies } from './RtpsList'
import { State } from './store'
import NavMenu from './NavMenu'
import { DisplayTransactionTriggerPolicies } from './Components/TransactionTriggerPolicy/DisplayTransactionTriggerPolicies'
import { Home } from './Components/Home/Home'
import { Wallet } from './Components/Wallet/Wallet'

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
          <Route path="/" exact component={Home} />
          <Route path="/rtpList" exact component={ShowRoutineTransactionPolicies} />
          <Route path="/ttpList" exact component={DisplayTransactionTriggerPolicies} />
          <Route path="/wallets/:nymId" exact component={Wallet} />
        </Switch>
      </Layout.Content>
    </Layout>
  )
}
export default MainLayout
