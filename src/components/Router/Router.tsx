import React from 'react'
import { Route, Routes } from 'react-router-dom'

// Layouts
import { MainLayout } from 'layouts'

// Pages
import { Home, LoadingPage, NotFound } from 'pages'

// Dynamic imports
const Cart = React.lazy(
  () => import(/* webpackChunkName: "Cart"*/ 'pages/Cart/Cart'),
)
const PizzaPage = React.lazy(
  () => import(/* webpackChunkName: "PizzaPage"*/ 'pages/PizzaPage/PizzaPage'),
)

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />

        <Route
          path="/cart"
          element={
            <React.Suspense fallback={<LoadingPage />}>
              <Cart />
            </React.Suspense>
          }
        />

        <Route
          path="/pizza/:id"
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

export default Router
