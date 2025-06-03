import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../Models';

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: { user: null },
//   reducers: {
//     login: (state, action) => {
//       state.user = action.payload
//     },
//     logout: (state) => {
//       state.user = null
//     },
//   },
// })

interface AuthState {
  user: User | null
}

const savedUser = localStorage.getItem('user')
const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
    },
  },
})


export const { login, logout } = authSlice.actions
export default authSlice.reducer
