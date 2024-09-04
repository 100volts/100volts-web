import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon,BoltIcon,FireIcon,IdentificationIcon,CloudIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Efishency',
    description:
      'Trach automatecly electrisity, watter gas and mote',
    icon: BoltIcon,
  },
  {
    name: 'Cloud storage',
    description:
      'Track and see you efishentsy eveiware. All data is securly stored in our cloud infrastructer.',
    icon: CloudIcon,
  },
  {
    name: '',
    description:
      '',
    icon: IdentificationIcon,
  },
  {
    name: 'Advanced security',
    description:
      'Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.',
    icon: FingerPrintIcon,
  },
]

export default function FeatureSections() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Mantain your production</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you for production traking and managament
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Quick and easy ways for you and your company to track, mantain and odit your production.
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
