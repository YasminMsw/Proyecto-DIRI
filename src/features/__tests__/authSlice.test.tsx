import { describe, expect, it } from 'vitest'
import authReducer, { login, logout } from '../auth/authSlice';

describe('authSlice', () => {
  const initialState = { user: null }

  it('debería manejar login correctamente', () => {
    const fakeUser = { uid: '123', email: 'test@example.com' }
    const nextState = authReducer(initialState, login(fakeUser))

    expect(nextState.user).toEqual(fakeUser)
  })

  it('debería manejar logout y limpiar el usuario', () => {
    const prevState = { user: { uid: 'abc', email: 'a@a.com' } }
    const nextState = authReducer(prevState, logout())

    expect(nextState.user).toBeNull()
  })
})
