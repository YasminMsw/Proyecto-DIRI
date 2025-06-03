import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import transactionReducer from '../features/transactions/transactionSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionReducer,
  },
})

// Tipado para usar en hooks
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch