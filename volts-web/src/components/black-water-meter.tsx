import React, { useState, useEffect } from 'react'

const DigitDisplay = ({ digit }: { digit: string }) => {
  const [key, setKey] = useState(0)

  useEffect(() => {
    setKey(prevKey => prevKey + 1)
  }, [digit])

  return (
    <div className="digit-container">
      <div key={key} className="digit-display">
        {digit}
      </div>
    </div>
  )
}

interface WaterMeterProps {
  initialValue?: number;
}

export default function Component({ initialValue = 0 }: WaterMeterProps) {
  const [meterValue, setMeterValue] = useState(initialValue)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10)
    if (!isNaN(value)) {
      setMeterValue(value)
    }
  }
  const paddedValue = meterValue.toString().padStart(8, '0')

  return (
    <div className="flex ">
      <div className="water-meter">
        {paddedValue.split('').map((digit, index) => (
          <DigitDisplay key={index} digit={digit} />
        ))}
      </div>
      <style>{`
        .water-meter {
          display: flex;
          //background-color: #111;
          border: 2px solid #333;
          border-radius: 8px;
          padding: 10px;
          //font-family: 'Courier New', monospace;
          box-shadow: 0 0 10px rgba(255,255,255,0.1);
        }
        .digit-container {
          width: 40px;
          height: 60px;
          margin: 0 2px;
          perspective: 300px;
          overflow: hidden;
        }
        .digit-display {
          width: 100%;
          height: 100%;
          //background-color: #000;
          border: 1px solid #444;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 2rem;
          font-weight: bold;
          border-radius: 4px;
          //color: #fff;
          text-shadow: 0 0 5px rgba(255,255,255,0.5);
          box-shadow: inset 0 2px 4px rgba(255,255,255,0.1);
          position: relative;
          animation: flip 0.3s ease-in-out;
          transform-style: preserve-3d;
        }
        .digit-display::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            to bottom,
            rgba(255,255,255,0.1) 0%,
            rgba(255,255,255,0.05) 50%,
            rgba(255,255,255,0) 51%,
            rgba(255,255,255,0.05) 100%
          );
          pointer-events: none;
        }
        @keyframes flip {
          0% {
            transform: rotateX(0deg);
          }
          50% {
            transform: rotateX(90deg);
          }
          100% {
            transform: rotateX(0deg);
          }
        }
      `}</style>
    </div>
  )
}