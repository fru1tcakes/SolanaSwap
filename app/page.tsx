import Header from './components/Header'
import PriceChart from './components/PriceChart'
import PurchaseForm from './components/PurchaseForm'
import Cart from './components/Cart'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-center mb-8">Solana DevNet Exchange</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <PriceChart />
            <PurchaseForm />
          </div>
          <Cart />
        </div>
      </main>
    </div>
  )
}

