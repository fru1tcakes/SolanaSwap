import { Suspense } from 'react'
import SuccessContent from '../components/SuccessContent'

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  )
}

