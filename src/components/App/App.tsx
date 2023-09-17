import React from 'react'
import { Route, Routes } from 'react-router-dom'

// Pages 'n Layouts
import { Home, LoadingPage, NotFound } from 'pages'
import { MainLayout } from 'layouts'

// Dynamic imports
const Cart = React.lazy(
  () => import(/* webpackChunkName: "Cart"*/ 'pages/Cart/Cart'),
)
const PizzaPage = React.lazy(
  () => import(/* webpackChunkName: "PizzaPage"*/ 'pages/PizzaPage/PizzaPage'),
)

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <React.Suspense fallback={<LoadingPage />}>
              <Cart />
            </React.Suspense>
          }
        />
        <Route
          path="pizza-:id"
          element={
            <React.Suspense fallback={<LoadingPage />}>
              <PizzaPage />
            </React.Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
