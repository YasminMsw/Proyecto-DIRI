import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from '../PrivateRoute'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/features/auth/authSlice'
import { describe, expect, it } from 'vitest'

describe('PrivateRoute', () => {
  const renderWithAuth = (user: any) => {
    const store = configureStore({
      reducer: { auth: authReducer },
      preloadedState: { auth: { user } },
    })

    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/home']}>
          <Routes>
            <Route path="/login" element={<div>Página pública</div>} />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <div>Contenido privado</div>
                </PrivateRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    )
  }

  it('redirige al login si el usuario no está autenticado', () => {
    renderWithAuth(null)
    expect(screen.getByText(/página pública/i)).toBeInTheDocument()
  })

  it('muestra contenido si el usuario está autenticado', () => {
    renderWithAuth({ uid: 'abc', email: 'test@test.com' })
    expect(screen.getByText(/contenido privado/i)).toBeInTheDocument()
  })
})
