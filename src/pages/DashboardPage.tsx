import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
} from 'recharts'
import { useTranslation } from 'react-i18next'
import Balance from '@/components/Balance'

const DashboardPage = () => {
  const { t } = useTranslation()
  const transactions = useSelector((state: RootState) => state.transactions.list)

  const resumenTipo = [
    {
      name: t('dashboard.income'),
      total: transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0),
    },
    {
      name: t('dashboard.expense'),
      total: transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0),
    },
  ]

  const resumenCategoria = Object.entries(
    transactions.reduce((acc, t) => {
      const key = t.category
      acc[key] = (acc[key] || 0) + t.amount
      return acc
    }, {} as Record<string, number>)
  ).map(([name, total]) => ({ name, total }))

  const sorted = [...transactions].sort((a, b) => {
    return new Date(a.date.toString()).getTime() - new Date(b.date.toString()).getTime()
  })

  let saldoAcumulado = 0
  const resumenSaldo = sorted.map((t) => {
    saldoAcumulado += t.type === 'income' ? t.amount : -t.amount
    return {
      date: new Date(t.date.toString()).toLocaleDateString(),
      saldo: saldoAcumulado,
    }
  })

  const colores = ['#34d399', '#f87171', '#60a5fa', '#fbbf24', '#a78bfa']

  return (
    <div className="p-4 flex flex-col gap-12 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">{t('dashboard.title')}</h1>
      <div>
        <Balance/>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">{t('dashboard.income_vs_expense')}</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={resumenTipo}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">{t('dashboard.by_category')}</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={resumenCategoria} dataKey="total" nameKey="name" outerRadius={100}>
              {resumenCategoria.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colores[index % colores.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">{t('dashboard.balance_evolution')}</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={resumenSaldo}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="saldo" stroke="#10b981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default DashboardPage
