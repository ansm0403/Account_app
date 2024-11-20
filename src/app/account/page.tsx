
import dynamic from 'next/dynamic'

const Transactions = dynamic(()=> import('@/components/account/Transactions'))

export default function AccountPage() {
  return (
    <div>
        <Transactions />
    </div>
  )
}
