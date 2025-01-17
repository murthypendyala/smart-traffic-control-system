'use client'

import { useState, useEffect, useCallback } from 'react'
import VideoProcessor from './components/VideoProcessor'
import TrafficLight from './components/TrafficLight'
import EmergencyVehicleDetector from './components/EmergencyVehicleDetector'

const VIDEO_URLS = [
  'https://cdn.pixabay.com/video/2016/01/11/1900-151662242_large.mp4',
  'https://cdn.pixabay.com/video/2016/01/11/1900-151662242_large.mp4',
  'https://cdn.pixabay.com/video/2016/01/11/1900-151662242_large.mp4',
  'https://cdn.pixabay.com/video/2016/01/11/1900-151662242_large.mp4',
]

const EMERGENCY_VEHICLES = ['Ambulance', 'Fire Truck', 'Police Car']

export default function SmartTrafficControl() {
  const [vehicleCounts, setVehicleCounts] = useState([0, 0, 0, 0])
  const [emergencyVehicles, setEmergencyVehicles] = useState([null, null, null, null])
  const [currentGreen, setCurrentGreen] = useState(0)
  const [lastChangeTime, setLastChangeTime] = useState(Date.now())

  const updateVehicleCounts = useCallback(() => {
    setVehicleCounts(prev => {
      const newCounts = [...prev]
      for (let i = 0; i < newCounts.length; i++) {
        if (i === currentGreen) {
          newCounts[i] = Math.max(0, newCounts[i] - 1)
        } else if (newCounts[i] < 50) {
          newCounts[i] += Math.floor(Math.random() * 2)
        }
      }
      return newCounts
    })
  }, [currentGreen])

  const detectEmergencyVehicle = useCallback(() => {
    const lane = Math.floor(Math.random() * 4)
    if (Math.random() < 0.5) { // 20% chance of emergency vehicle
      const type = EMERGENCY_VEHICLES[Math.floor(Math.random() * EMERGENCY_VEHICLES.length)]
      setEmergencyVehicles(prev => {
        const newEmergencyVehicles = [...prev]
       // @ts-ignore
        newEmergencyVehicles[lane] = type
        return newEmergencyVehicles
      })
      setCurrentGreen(lane) // Immediately set green light to emergency vehicle lane
    } else {
      setEmergencyVehicles(prev => {
        const newEmergencyVehicles = [...prev]
        newEmergencyVehicles[lane] = null
        return newEmergencyVehicles
      })
    }
  }, [])

  const updateTrafficLight = useCallback(() => {
    const currentTime = Date.now()
    if (currentTime - lastChangeTime < 5000) return

    const emergencyLane = emergencyVehicles.findIndex(vehicle => vehicle !== null)
    if (emergencyLane !== -1) {
      setCurrentGreen(emergencyLane)
    } else {
      const maxCountLane = vehicleCounts.findIndex(count => count >= 50)
      if (maxCountLane !== -1) {
        setCurrentGreen(maxCountLane)
      } else if (vehicleCounts[currentGreen] === 0) {
        const nextLane = (currentGreen + 1) % 4
        const maxCount = Math.max(...vehicleCounts)
        const newGreen = vehicleCounts.findIndex(count => count === maxCount)
        setCurrentGreen(newGreen)
      }
    }
    setLastChangeTime(currentTime)
  }, [vehicleCounts, emergencyVehicles, currentGreen, lastChangeTime])

  useEffect(() => {
    const countInterval = setInterval(updateVehicleCounts, 1000)
    const lightInterval = setInterval(updateTrafficLight, 1000)
    const emergencyInterval = setInterval(detectEmergencyVehicle, 5000)

    return () => {
      clearInterval(countInterval)
      clearInterval(lightInterval)
      clearInterval(emergencyInterval)
    }
  }, [updateVehicleCounts, updateTrafficLight, detectEmergencyVehicle])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Smart Traffic Control System</h1>
      <div className="grid grid-cols-2 gap-4">
        {[0, 1, 2, 3].map(lane => (
          <div key={lane} className="border p-4 rounded-lg relative">
            <h2 className="text-xl font-semibold mb-2">Lane {lane + 1}</h2>
            <VideoProcessor 
              videoUrl={VIDEO_URLS[lane]} 
              isGreen={currentGreen === lane}
            />
            <TrafficLight isGreen={currentGreen === lane} />
            <p>Vehicle Count: {vehicleCounts[lane]}</p>
            <EmergencyVehicleDetector 
              lane={lane} 
              detectedVehicle={emergencyVehicles[lane]}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

