"use client"

import type { Captain } from "@/lib/draft-data"
import { Button } from "@/components/ui/button"
import { ChevronUp, ChevronDown } from "lucide-react"
import Image from "next/image"

interface CaptainOrderProps {
  captains: Captain[]
  onReorder: (captains: Captain[]) => void
  onStartDraft: () => void
}

export function CaptainOrder({ captains, onReorder, onStartDraft }: CaptainOrderProps) {
  const moveCaptain = (index: number, direction: "up" | "down") => {
    const newCaptains = [...captains]
    const targetIndex = direction === "up" ? index - 1 : index + 1

    if (targetIndex < 0 || targetIndex >= captains.length) return
    ;[newCaptains[index], newCaptains[targetIndex]] = [newCaptains[targetIndex], newCaptains[index]]
    onReorder(newCaptains)
  }

  const handleStartDraft = () => {
    onStartDraft()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0a1f] via-[#1a1333] to-[#0f0a1f] p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-col items-center text-center">
          <Image src="/logo.png" alt="Kings Lendas" width={120} height={120} className="mb-4 h-32 w-auto" />
          <h1 className="mb-2 font-bold text-4xl tracking-wider text-white">Simulador Kings Lendas</h1>
          <p className="text-3xl text-purple-300">Defina a ordem dos capitães</p>
        </div>

        <div className="rounded-lg border-2 border-[#3730a3] bg-[#1a1333]/80 p-6">
          <div className="mb-6">
            <h2 className="mb-4 font-bold text-xl tracking-wide text-white">Ordem de Draft</h2>
            <div className="space-y-2">
              {captains.map((captain, index) => (
                <div
                  key={captain.name}
                  className="flex items-center gap-3 rounded-lg border border-[#3730a3] bg-[#2d2550] p-4 transition-all hover:border-[#a855f7]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#a855f7] font-mono font-bold text-lg text-white">
                    {index + 1}
                  </div>
                  <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border-2 border-[#a855f7]">
                    <Image src={captain.photo || "/placeholder.svg"} alt={captain.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white">{captain.name}</div>
                    <div className="text-sm text-purple-300">{captain.position}</div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => moveCaptain(index, "up")}
                      disabled={index === 0}
                      className="h-8 w-8 text-white hover:bg-[#a855f7] hover:text-white disabled:opacity-30"
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => moveCaptain(index, "down")}
                      disabled={index === captains.length - 1}
                      className="h-8 w-8 text-white hover:bg-[#a855f7] hover:text-white disabled:opacity-30"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={handleStartDraft}
            className="w-full bg-[#a855f7] font-bold text-lg uppercase tracking-wide text-white hover:bg-[#d946ef]"
            size="lg"
          >
            Iniciar Draft
          </Button>
        </div>
      </div>
    </div>
  )
}
