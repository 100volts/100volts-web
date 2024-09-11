import { useState, useEffect } from 'react'

const DialDigit = ({ digit, speed }: { digit: number; speed: number }) => (
  <div className="relative w-12 h-16 bg-black border border-gray-700 rounded-md overflow-hidden">
    <div
      className="absolute inset-0 flex flex-col items-center transition-transform duration-1000 ease-linear"
      style={{
        transform: `translateY(-${digit * 10}%)`,
        transitionDuration: `${speed}ms`,
      }}
    >
      {[9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num, index) => (
        <div key={index} className="flex items-center justify-center h-full w-full text-2xl font-bold text-white">
          {num}
        </div>
      ))}
    </div>
  </div>
)

export function BlackWaterMeter() {
  const [count, setCount] = useState(0)
  const digits = String(Math.floor(count)).padStart(6, '0').split('').map(Number)

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => prevCount + 0.1)
    }, 100)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-black p-8 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">Water Meter</h2>
        <div className="flex space-x-1">
          {digits.map((digit, index) => (
            <DialDigit key={index} digit={digit} speed={1000 * Math.pow(10, index)} />
          ))}
          <div className="text-2xl font-bold text-white ml-2 self-end mb-2">m³</div>
        </div>
      </div>
    </div>
  )
}