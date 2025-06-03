export interface Transaction {
  id: string
  type: TransactionType
  amount: number
  category: string
  date: string | import('firebase/firestore').Timestamp
  description?: string
}

// interface AuthState {
//   user: User | null
// }

export interface TransactionState {
  list: Transaction[]
}


export type TransactionType = 'income' | 'expense'

export interface User {
  uid: string
  email: string | null
}