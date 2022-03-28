import store, { history } from './store'
import { useAccount, PrivateRoute } from '@library/react-toolkit'
import { Provider } from 'react-redux'
import { option } from 'fp-ts'
import { pipe } from 'fp-ts/lib/function'
import * as React from 'react'
import { IntlProvider } from 'react-intl'
import { createGlobalStyle, DefaultTheme, ThemeProvider } from 'styled-components'

import { ConnectedRouter } from 'connected-react-router'
import Layout from './Layout'
import Notifications from './Notifications'
import data from './translations/data'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      bodyBackground: string
      primary: string
      primaryLight: string
      primaryExtraLight: string
      error: string
      secondary: string
      white: string
      light: string
      extraLight: string
      extraDark: string
      dark: string
      darkLight: string
      blue: string
      red: string
    }
    paddingUnit: number

    footerHeight: number
    headerHeight: number
  }
}

const theme: DefaultTheme = {
  colors: {
    bodyBackground: '#f2f2f2',
    primary: '#51B148',
    primaryLight: 'rgba(0, 158, 15, 0.85)',
    primaryExtraLight: 'rgba(0, 158, 15, 0.25)',
    error: '#f44336',
    secondary: '#2660a4',
    white: '#fff',
    light: 'rgba(255, 255, 255, 0.65)',
    extraLight: 'rgba(255, 255, 255, 0.85)',
    extraDark: 'rgba(0, 0, 0, 0.85)',
    dark: 'rgba(0, 0, 0, 0.65)',
    darkLight: 'rgba(0, 0, 0, 0.25)',
    blue: '#2B78E4',
    red: '#CF2A27',
  },
  paddingUnit: 8,

  footerHeight: 64,
  headerHeight: 48,
}

const GlobalStyle = createGlobalStyle`
#root {
  width: 100%;
  height: 100%;
 
}

*.ant-btn {
  & > *.anticon,
  & > *.ant-btn-loading-icon {
    margin-right: 8px;
   }

   & > *.anticon:last-child {
    margin-right: 0px;
   }
}

*.ant-btn.ant-btn-icon-only {
  & > *.anticon,
  & > *.ant-btn-loading-icon {
    margin-right: 0px;
  }
}

tr {
 & > th:first-child,
  &  > td:first-child {
    padding-left: 24px !important;
  }

  & > th:last-child,
  & > td:last-child {
    padding-right: 24px !important;
  }
}

ul.ant-menu-vertical.ant-menu-sub {
  min-width: unset;
  border-radius: 0 0 8px 8px;
  margin-top: -8px;
}
`

const WithThemeAndLocale = () => {
  const account = useAccount()
  const locale = pipe(
    option.fromNullable(account?.langKey),
    option.flatten,
    option.getOrElse(() => 'en')
  )

  return (
    <IntlProvider locale={locale} messages={data[locale]}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Notifications />
        <PrivateRoute nodeEnv={process.env.NODE_ENV} component={Layout} />
      </ThemeProvider>
    </IntlProvider>
  )
}

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <WithThemeAndLocale />
    </ConnectedRouter>
  </Provider>
)

export default App
