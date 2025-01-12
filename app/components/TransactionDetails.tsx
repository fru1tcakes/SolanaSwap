interface TransactionDetailsProps {
  amount: string
  wallet: string
}

export default function TransactionDetails({ amount, wallet }: TransactionDetailsProps) {
  const solAmount = (Number(amount) / 200).toFixed(8)
  const exchangeRate = 200
  const processingFee = 20
  const networkFee = 0.17

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Transaction details</h2>
      
      <div className="space-y-4">
        <div>
          <div className="text-sm text-gray-600">You get</div>
          <div className="font-semibold">~ {solAmount} SOL</div>
        </div>

        <div>
          <div className="text-sm text-gray-600">Exchange rate</div>
          <div className="font-semibold">1 SOL = ${exchangeRate} USD</div>
        </div>

        <div>
          <div className="text-sm text-gray-600">Processing fee</div>
          <div className="font-semibold">${processingFee} USD</div>
        </div>

        <div>
          <div className="text-sm text-gray-600">Network fee</div>
          <div className="font-semibold">${networkFee} USD</div>
        </div>

        <div>
          <div className="text-sm text-gray-600">You send</div>
          <div className="font-semibold">${amount} USD</div>
        </div>

        <div>
          <div className="text-sm text-gray-600">Payment method</div>
          <div className="font-semibold">Visa / Mastercard</div>
        </div>

        <div className="pt-4 border-t">
          <div className="text-sm text-gray-600">Wallet address</div>
          <div className="font-mono text-sm break-all">
            {wallet}
          </div>
        </div>
      </div>
    </div>
  )
}

