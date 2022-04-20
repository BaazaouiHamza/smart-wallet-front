import './index.less'

import * as React from 'react'
import { render } from 'react-dom'
import { ReactQueryDevtools } from 'react-query/devtools'
import App from './App'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools position="bottom-right" />
  </QueryClientProvider>,
  document.getElementById('root')
)
