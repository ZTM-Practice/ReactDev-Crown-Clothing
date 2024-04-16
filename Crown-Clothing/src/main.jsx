import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { UserProvider } from './contexts/user.context.jsx' 
import { CategoriesProvider } from './contexts/categories.context.jsx'
import { CartProvider } from './contexts/cart.context.jsx'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <CategoriesProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </CategoriesProvider>
    </UserProvider>
  </React.StrictMode>,
)
