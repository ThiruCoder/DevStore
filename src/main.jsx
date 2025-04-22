import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './Redux_Section/Product_Store.jsx'
import ScrollToTop from './ScrollToTop.jsx'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ScrollToTop />
        <Provider store={store}>
          <App />
        </Provider>,
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)
