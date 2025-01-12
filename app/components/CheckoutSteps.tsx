import { CheckCircle2 } from 'lucide-react'

interface CheckoutStepsProps {
  currentStep: number
}

export default function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  const steps = [
    {
      title: 'Purchase pair',
      description: 'Select the pair which you would like to buy and the fiat currency you want to purchase crypto with.'
    },
    {
      title: 'Wallet address',
      description: 'Enter the address of the crypto wallet to which your new cryptocurrency will be sent.'
    },
    {
      title: 'Payment',
      description: 'Confirm the payment and receive your newly purchased cryptocurrency in a few minutes.'
    }
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Crypto purchase steps</h2>
      <div className="space-y-8">
        {steps.map((step, index) => {
          const isCompleted = currentStep > index + 1
          const isActive = currentStep === index + 1

          return (
            <div
              key={index}
              className={`flex items-start gap-4 ${
                isCompleted ? 'text-green-600' : isActive ? 'text-black' : 'text-gray-400'
              }`}
            >
              <div className="flex-shrink-0 mt-1">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">{step.title}</h3>
                <p className="text-sm mt-1">{step.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

