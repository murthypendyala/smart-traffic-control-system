import { Ambulance, Truck, BadgeIcon as Police } from 'lucide-react'

interface EmergencyVehicleDetectorProps {
  lane: number
  detectedVehicle: string | null
}

export default function EmergencyVehicleDetector({ lane, detectedVehicle }: EmergencyVehicleDetectorProps) {
  const getEmergencyVehicleIcon = () => {
    switch (detectedVehicle) {
      case 'Ambulance':
        return <Ambulance size={24} className="text-red-500" />
      case 'Fire Truck':
        return <Truck size={24} className="text-red-500" />
      case 'Police Car':
        return <Police size={24} className="text-blue-500" />
      default:
        return null
    }
  }

  return (
    <div className="mt-2 p-2 border rounded">
      <h3 className="font-semibold">Emergency Vehicle Detector</h3>
      {detectedVehicle ? (
        <div className="flex items-center">
          {getEmergencyVehicleIcon()}
          <span className="ml-2 text-red-600 font-bold">{detectedVehicle} detected!</span>
        </div>
      ) : (
        <p>No emergency vehicles detected</p>
      )}
    </div>
  )
}

