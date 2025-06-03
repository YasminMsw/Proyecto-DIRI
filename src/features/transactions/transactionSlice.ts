import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Transaction,TransactionState } from '../../Models';

const initialState: TransactionState = {
  list: [],
}

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.list = action.payload
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.list.push(action.payload)
    },
  },
})

export const { setTransactions, addTransaction } = transactionSlice.actions
export default transactionSlice.reducer
