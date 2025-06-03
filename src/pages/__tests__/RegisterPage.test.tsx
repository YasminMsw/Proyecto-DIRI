// src/pages/__tests__/RegisterPage.test.tsx

import { describe, expect, it, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import RegisterPage from '../RegisterPage'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/features/auth/authSlice'
import { BrowserRouter } from 'react-router-dom'


// Mock de Firebase
vi.mock('firebase/auth', async () => {
  return {
    getAuth: vi.fn(() => ({})),
    createUserWithEmailAndPassword: vi.fn(() =>
      Promise.resolve({
        user: { uid: '123', email: 'test@example.com' },
      })
    )
  }
})

describe('RegisterPage', () => {
  const store = configureStore({
    reducer: { auth: authReducer }
  })

  it('permite rellenar el formulario de registro y enviarlo', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterPage />
        </BrowserRouter>
      </Provider>
    )

    fireEvent.change(screen.getByPlaceholderText('Nombre'), {
      target: { value: 'Jasmin' },
    })
    fireEvent.change(screen.getByPlaceholderText('Apellido'), {
      target: { value: 'Gómez' },
    })
    fireEvent.change(screen.getByPlaceholderText('Correo'), {
      target: { value: 'jasmin@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Contraseña'), {
      target: { value: '123456' },
    })

    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }))

    expect(await screen.findByText(/¿Ya tienes cuenta?/i)).toBeInTheDocument()
  })
})
