import { ArrowPathIcon, ChartPieIcon, FingerPrintIcon, LockClosedIcon,BoltIcon,FireIcon,IdentificationIcon,CloudIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Unmatched Efficiency:',
    description:
      'Streamline Utility and Production Tracking with Our Lightning-Fast, Accurate Software!',
    icon: BoltIcon,
  },
  {
    name: 'Secure, Scalable, and Effortless',
    description:
      'Unlock Unlimited Cloud Storage for Your Critical Data!',
    icon: CloudIcon,
  },
  {
    name: 'Transform Your Workflow',
    description:
      ' Boost Productivity and Streamline Operations with Our All-in-One Software Solution!',
    icon: ChartPieIcon,
  },
  {
    name: 'Advanced security',
    description:
      'Advanced Protection, Total Peace of Mind: Keep Your Data Safe with Our Cutting-Edge Security Features!',
    icon: FingerPrintIcon,
  },
]

export default function FeatureSections() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Maintain your production</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          everything you for production tracking and management
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
          Maximize Efficiency & Cut Costs: Track Electricity, Water, Gas, & Production in Real Time.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon aria-hidden="true" className="h-6 w-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
