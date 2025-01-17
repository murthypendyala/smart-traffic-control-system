export function detectVehicles() {
  // Simulating YOLOv5 detection
  const count = Math.floor(Math.random() * 20) // Random count between 0 and 19
  const hasEmergency = Math.random() < 0.4 // 10% chance of emergency vehicle

  return { count, hasEmergency }
}

