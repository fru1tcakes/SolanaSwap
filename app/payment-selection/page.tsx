import { Suspense } from 'react'
import PaymentSelectionContent from '../components/PaymentSelectionContent'

export default function PaymentSelectionPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSelectionContent />
    </Suspense>
  )
}

