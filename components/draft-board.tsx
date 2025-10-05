"use client"

import type { Captain, Player, Position } from "@/lib/draft-data"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Undo2 } from "lucide-react"
import Image from "next/image"
import { PickAnimation } from "./pick-animation"
import { useState } from "react"

interface Team {
  captain: Captain
  players: Player[]
}

interface DraftBoardProps {
  teams: Team[]
  currentCaptainIndex: number
  availablePlayers: Record<Position, Player[]>
  pickedPlayers: Set<string>
  onPickPlayer: (player: Player) => void
  onReset: () => void
  isDraftComplete: boolean
  onUndoPick: () => void
  canUndo: boolean
}

const POSITION_COLORS: Record<Position, string> = {
  Top: "bg-green-600",
  Jungle: "bg-purple-600",
  Mid: "bg-red-600",
  ADC: "bg-yellow-500",
  Suporte: "bg-blue-400",
}

const POSITION_LABELS: Record<Position, string> = {
  Top: "Topo",
  Jungle: "Selva",
  Mid: "Meio",
  ADC: "Atirador",
  Suporte: "Suporte",
}

export function DraftBoard({
  teams,
  currentCaptainIndex,
  availablePlayers,
  pickedPlayers,
  onPickPlayer,
  onReset,
  isDraftComplete,
  onUndoPick,
  canUndo,
}: DraftBoardProps) {
  const [lastPickedPlayer, setLastPickedPlayer] = useState<Player | null>(null)

  const currentTeam = teams[currentCaptainIndex]
  const positions: Position[] = ["Top", "Jungle", "Mid", "ADC", "Suporte"]

  if (!currentTeam) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-lg text-muted-foreground">Carregando...</p>
      </div>
    )
  }

  const canPickPosition = (position: Position): boolean => {
    if (currentTeam.captain.position === position) return false
    return !currentTeam.players.some((p) => p.position === position)
  }

  const handlePickPlayer = (player: Player) => {
    setLastPickedPlayer(player)
    onPickPlayer(player)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0a1f] via-[#1a1333] to-[#0f0a1f] p-4">
      <PickAnimation player={lastPickedPlayer} onComplete={() => setLastPickedPlayer(null)} />

      <div className="mx-auto mb-6 flex max-w-[1920px] items-center justify-between">
        <div className="flex items-center gap-4">
          <Image src="/logo.png" alt="Kings Lendas" width={80} height={80} className="h-20 w-auto" />
          <div>
            <h1 className="font-bold text-3xl tracking-wider text-white">Simulador Kings Lendas</h1>
            {!isDraftComplete && (
              <p className="text-sm text-purple-300">
                Escolhendo: <span className="font-bold text-[#a855f7]">{currentTeam.captain.name}</span>
              </p>
            )}
            {isDraftComplete && <p className="font-bold text-lg text-[#d946ef]">Draft Completo!</p>}
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onUndoPick}
            disabled={!canUndo}
            className="border-[#a855f7] bg-[#1a1333] text-white hover:bg-[#a855f7] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Undo2 className="mr-2 h-4 w-4" />
            Desfazer
          </Button>
          <Button
            variant="outline"
            onClick={onReset}
            className="border-[#a855f7] bg-[#1a1333] text-white hover:bg-[#a855f7]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Reiniciar
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-[1920px] space-y-6">
        <div className="rounded-lg border-2 border-[#3730a3] bg-[#1a1333]/80 p-4">
          <h2 className="mb-4 font-bold text-xl uppercase tracking-wide text-white">Times</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
            {teams.map((team, index) => {
              const isCurrentTeam = index === currentCaptainIndex && !isDraftComplete

              return (
                <div
                  key={team.captain.name}
                  className={`rounded-lg border-2 p-3 transition-all ${
                    isCurrentTeam
                      ? "border-[#a855f7] bg-gradient-to-b from-[#a855f7]/20 to-[#d946ef]/10 shadow-lg shadow-[#a855f7]/50"
                      : "border-[#3730a3] bg-[#0f0a1f]/50"
                  }`}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-[#a855f7]">
                      <Image
                        src={team.captain.photo || "/placeholder.svg"}
                        alt={team.captain.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div
                      className={`flex-1 rounded px-2 py-1 text-center font-bold text-xs uppercase ${
                        isCurrentTeam ? "bg-[#a855f7] text-white" : "bg-[#1e3a8a] text-white"
                      }`}
                    >
                      {team.captain.name}
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    {positions.map((position) => {
                      const player = team.players.find((p) => p.position === position)
                      const isCaptainPosition = team.captain.position === position
                      const displayName = isCaptainPosition ? team.captain.name : player?.name || "—"

                      return (
                        <div
                          key={position}
                          className="flex items-center justify-between rounded bg-[#2d2550]/50 px-2 py-1"
                        >
                          <span className="text-gray-400">{POSITION_LABELS[position]}</span>
                          <span className="font-semibold text-white">{displayName}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-lg border-2 border-[#3730a3] bg-[#1a1333]/80 p-4">
          <h2 className="mb-4 font-bold text-xl uppercase tracking-wide text-white">Jogadores Disponíveis</h2>
          <div className="grid grid-cols-5 gap-4">
            {positions.map((position) => {
              const allPlayers = [...availablePlayers[position]]
              const canPick = canPickPosition(position) && !isDraftComplete

              return (
                <div key={position} className="space-y-2">
                  <div
                    className={`rounded px-3 py-2 text-center font-bold text-sm uppercase ${POSITION_COLORS[position]} text-white`}
                  >
                    {POSITION_LABELS[position]}
                  </div>

                  <div className="space-y-1">
                    {allPlayers.map((player) => {
                      const isPicked = pickedPlayers.has(player.name)
                      const isClickable = canPick && !isPicked

                      return (
                        <button
                          key={player.name}
                          onClick={() => isClickable && handlePickPlayer(player)}
                          disabled={!isClickable}
                          className={`flex w-full items-center gap-2 rounded border px-2 py-1.5 text-left text-sm transition-all ${
                            isPicked
                              ? "border-[#3730a3]/30 bg-[#2d2550]/30 text-gray-600 line-through"
                              : isClickable
                                ? "border-[#3730a3] bg-[#1e3a8a] text-white hover:border-[#a855f7] hover:bg-[#a855f7] hover:shadow-lg hover:shadow-[#a855f7]/50"
                                : "cursor-not-allowed border-[#3730a3]/50 bg-[#2d2550]/50 text-gray-500"
                          }`}
                        >
                          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-[#3730a3]">
                            <Image
                              src={player.photo || "/placeholder.svg"}
                              alt={player.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="flex-1">{player.name}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
