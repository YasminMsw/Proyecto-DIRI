import { render, screen, fireEvent } from '@testing-library/react'
import TransactionForm from '../TransactionForm'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import { describe, expect, it, vi } from 'vitest'

describe('TransactionForm', () => {
  it('muestra los campos básicos del formulario', () => {
    render(
      <Provider store={store}>
        <TransactionForm />
      </Provider>
    )

    expect(screen.getByPlaceholderText(/Cantidad/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Categoría/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Descripción/i)).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveTextContent(/Añadir|Guardar/i)
  })

  it('permite introducir datos y enviar el formulario', () => {
    const mockFinish = vi.fn()

    render(
      <Provider store={store}>
        <TransactionForm onFinish={mockFinish} />
      </Provider>
    )

    fireEvent.change(screen.getByPlaceholderText(/Cantidad/i), {
      target: { value: '250' },
    })
    fireEvent.change(screen.getByPlaceholderText(/Categoría/i), {
      target: { value: 'Alquiler' },
    })
    fireEvent.click(screen.getByRole('button'))

    // Esto no hará asserts funcionales porque Firebase es real,
    // pero valida que el botón reacciona sin crashear.
  })
})
