import { Ambulance, Truck, BadgeIcon as Police } from 'lucide-react'

interface EmergencyAlertProps {
  type: string
}

export default function EmergencyAlert({ type }: EmergencyAlertProps) {
  const getEmergencyVehicleIcon = () => {
    switch (type) {
      case 'Ambulance':
        return <Ambulance size={32} className="text-white" />
      case 'Fire Truck':
        return <Truck size={32} className="text-white" />
      case 'Police Car':
        return <Police size={32} className="text-white" />
      default:
        return null
    }
  }

  return (
    <div className="absolute top-0 left-0 right-0 bg-red-600 text-white p-2 flex items-center justify-center animate-pulse">
      {getEmergencyVehicleIcon()}
      <span className="ml-2 font-bold">{type} Detected!</span>
    </div>
  )
}

