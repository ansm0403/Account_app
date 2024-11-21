
import dynamic from 'next/dynamic'

const Transactions = dynamic(()=> import('@/components/account/Transactions'))
const MonthlyChart = dynamic(()=> import('@/components/account/MonthlyChart'))


export default function AccountPage() {
  return (
    <div>
        <MonthlyChart chartData={generateMonthlyChartData()} />
        <Transactions />
    </div>
  )
}

function generateMonthlyChartData(){
  return [
    '2024-01-31',
    '2024-02-28',
    '2024-03-31',
    '2024-04-30',
    '2024-05-31',
    '2024-06-30',
    '2024-07-31',
    '2024-08-31',
    '2024-09-30',
    '2024-10-31',
    '2024-11-30',
    '2024-12-31',
  ].map((date)=>({
      date,
      balance : Math.floor(Math.random() * (100000 - 10000 +1)) + 10000
  }))
}