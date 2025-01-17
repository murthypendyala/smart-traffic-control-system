'use client'

import { useState, useEffect, useRef } from 'react'

interface VideoProcessorProps {
  videoUrl: string
  isGreen: boolean
}

export default function VideoProcessor({ videoUrl, isGreen }: VideoProcessorProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const videoElement = videoRef.current
    if (videoElement) {
      const playVideo = () => {
        if (isGreen) {
          videoElement.play().catch(err => {
            console.error('Error playing video:', err)
            setError('Failed to play video. Please check your connection.')
          })
        } else {
          videoElement.pause()
        }
      }

      videoElement.addEventListener('loadedmetadata', playVideo)
      videoElement.addEventListener('error', (e) => {
        console.error('Video error:', e)
        setError('Failed to load video. Please try again later.')
      })

      playVideo()

      return () => {
        videoElement.removeEventListener('loadedmetadata', playVideo)
      }
    }
  }, [videoUrl, isGreen])

  return (
    <div className="aspect-video bg-gray-200 mb-2 relative overflow-hidden">
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center text-red-500">
          {error}
        </div>
      ) : (
        <video 
          ref={videoRef}
          src={videoUrl}
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover"
        >
          Your browser does not support the video tag.
        </video>
      )}
      {!isGreen && (
        <div className="absolute inset-0 bg-red-500 bg-opacity-50 flex items-center justify-center text-white font-bold text-xl">
          STOPPED
        </div>
      )}
    </div>
  )
}

