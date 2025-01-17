interface TrafficLightProps {
  isGreen: boolean
}

export default function TrafficLight({ isGreen }: TrafficLightProps) {
  return (
    <div className="flex justify-center items-center mb-2">
      <div className={`w-8 h-8 rounded-full ${isGreen ? 'bg-green-500' : 'bg-red-500'}`}></div>
    </div>
  )
}

