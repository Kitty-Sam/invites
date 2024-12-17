import type { ReactNode } from 'react'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
import FatalErrorPage from 'src/pages/FatalErrorPage'
import { Provider } from 'react-redux'
import { store } from '@/store/store'

import './index.css'

interface AppProps {
  children?: ReactNode
}

export const App = ({ children }: AppProps) => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <Provider store={store}>
      <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
        <RedwoodApolloProvider>{children}</RedwoodApolloProvider>
      </RedwoodProvider>
    </Provider>
  </FatalErrorBoundary>
)
