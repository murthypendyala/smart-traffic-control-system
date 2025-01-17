export function processTraffic(vehicleCounts: number[], emergencyVehicle: { lane: number, type: string } | null) {
  if (emergencyVehicle) {
    return emergencyVehicle.lane
  }

  const maxCount = Math.max(...vehicleCounts)
  return vehicleCounts.findIndex(count => count === maxCount)
}

