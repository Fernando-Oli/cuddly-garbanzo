"use client"

import type { Player } from "@/lib/draft-data"
import { useEffect, useState } from "react"
import Image from "next/image"

interface PickAnimationProps {
  player: Player | null
  onComplete: () => void
}

export function PickAnimation({ player, onComplete }: PickAnimationProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (player) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(onComplete, 500)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [player, onComplete])

  if (!player) return null

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 transition-all duration-500 ${
        isVisible ? "translate-x-0 opacity-100 scale-100" : "translate-x-full opacity-0 scale-75"
      }`}
    >
      <div className="relative bg-gradient-to-br from-purple-600 via-fuchsia-500 to-purple-700 p-1 rounded-lg shadow-2xl">
        <div className="bg-[#0a0e27] rounded-lg p-4 flex items-center gap-4 min-w-[300px]">
          <div className="relative w-24 h-24 rounded-lg overflow-hidden border-2 border-purple-400 shadow-lg">
            <Image src={player.photo || "/placeholder.svg"} alt={player.name} fill className="object-cover object-top" />
          </div>
          <div className="flex-1">
            <div className="text-xs text-purple-400 font-semibold mb-1">PICKADO</div>
            <div className="text-2xl font-bold text-white mb-1">{player.name}</div>
            <div className="text-sm text-gray-400">{player.position}</div>
          </div>
        </div>
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-fuchsia-500 to-purple-700 rounded-lg blur-xl opacity-50 -z-10" />
      </div>
    </div>
  )
}
