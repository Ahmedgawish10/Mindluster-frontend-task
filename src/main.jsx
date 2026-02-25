import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from '@/App.jsx'
import { BrowserRouter } from 'react-router'
import { store } from '@/todo/store'

const queryClient = new QueryClient()

const root = document.getElementById('root')
if (root) {
  createRoot(root).render(
    <StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </Provider>
    </StrictMode>,
  )
}
