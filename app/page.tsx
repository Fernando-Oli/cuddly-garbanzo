"use client"

import { useState } from "react"
import { CaptainOrder } from "@/components/captain-order"
import { DraftBoard } from "@/components/draft-board"
import { CAPTAINS, PLAYERS, type Captain, type Player, type Position } from "@/lib/draft-data"

interface Team {
  captain: Captain
  players: Player[]
}

interface PickHistory {
  player: Player
  captainIndex: number
  pickIndex: number
}

export default function Home() {
  const [captains, setCaptains] = useState<Captain[]>(CAPTAINS)
  const [draftStarted, setDraftStarted] = useState(false)
  const [teams, setTeams] = useState<Team[]>([])
  const [availablePlayers, setAvailablePlayers] = useState<Record<Position, Player[]>>({
    Top: [],
    Jungle: [],
    Mid: [],
    ADC: [],
    Suporte: [],
  })
  const [pickedPlayers, setPickedPlayers] = useState<Set<string>>(new Set())
  const [currentCaptainIndex, setCurrentCaptainIndex] = useState(0)
  const [pickOrder, setPickOrder] = useState<number[]>([])
  const [currentPickIndex, setCurrentPickIndex] = useState(0)
  const [pickHistory, setPickHistory] = useState<PickHistory[]>([])

  const handleStartDraft = () => {
    const initialTeams: Team[] = captains.map((captain) => ({
      captain,
      players: [],
    }))

    const captainNames = new Set(captains.map((c) => c.name))
    const filteredPlayers: Record<Position, Player[]> = {
      Top: PLAYERS.Top.filter((p) => !captainNames.has(p.name)),
      Jungle: PLAYERS.Jungle.filter((p) => !captainNames.has(p.name)),
      Mid: PLAYERS.Mid.filter((p) => !captainNames.has(p.name)),
      ADC: PLAYERS.ADC.filter((p) => !captainNames.has(p.name)),
      Suporte: PLAYERS.Suporte.filter((p) => !captainNames.has(p.name)),
    }

    const order: number[] = []
    const numCaptains = captains.length
    const picksPerCaptain = 4

    for (let round = 0; round < picksPerCaptain; round++) {
      if (round % 2 === 0) {
        for (let i = 0; i < numCaptains; i++) {
          order.push(i)
        }
      } else {
        for (let i = numCaptains - 1; i >= 0; i--) {
          order.push(i)
        }
      }
    }

    setTeams(initialTeams)
    setAvailablePlayers(filteredPlayers)
    setPickedPlayers(new Set())
    setPickOrder(order)
    setCurrentCaptainIndex(order[0])
    setCurrentPickIndex(0)
    setDraftStarted(true)
    setPickHistory([])
  }

  const handlePickPlayer = (player: Player) => {
    const newTeams = [...teams]
    newTeams[currentCaptainIndex].players.push(player)
    setTeams(newTeams)

    const newPickedPlayers = new Set(pickedPlayers)
    newPickedPlayers.add(player.name)
    setPickedPlayers(newPickedPlayers)

    const newHistory = [
      ...pickHistory,
      {
        player,
        captainIndex: currentCaptainIndex,
        pickIndex: currentPickIndex,
      },
    ]
    setPickHistory(newHistory)

    const nextPickIndex = currentPickIndex + 1
    if (nextPickIndex < pickOrder.length) {
      setCurrentPickIndex(nextPickIndex)
      setCurrentCaptainIndex(pickOrder[nextPickIndex])
    }
  }

  const handleUndoPick = () => {
    if (pickHistory.length === 0) return

    const lastPick = pickHistory[pickHistory.length - 1]

    // Remove player from team
    const newTeams = [...teams]
    newTeams[lastPick.captainIndex].players = newTeams[lastPick.captainIndex].players.filter(
      (p) => p.name !== lastPick.player.name,
    )
    setTeams(newTeams)

    // Remove player from picked set
    const newPickedPlayers = new Set(pickedPlayers)
    newPickedPlayers.delete(lastPick.player.name)
    setPickedPlayers(newPickedPlayers)

    // Remove from history
    setPickHistory(pickHistory.slice(0, -1))

    // Go back to previous pick
    setCurrentPickIndex(lastPick.pickIndex)
    setCurrentCaptainIndex(lastPick.captainIndex)
  }

  const handleReset = () => {
    setDraftStarted(false)
    setTeams([])
    setPickedPlayers(new Set())
    setCurrentCaptainIndex(0)
    setPickOrder([])
    setCurrentPickIndex(0)
    setPickHistory([])
  }

  const isDraftComplete = currentPickIndex >= pickOrder.length

  if (!draftStarted) {
    return <CaptainOrder captains={captains} onReorder={setCaptains} onStartDraft={handleStartDraft} />
  }

  if (teams.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-lg text-muted-foreground">Inicializando draft...</p>
      </div>
    )
  }

  return (
    <DraftBoard
      teams={teams}
      currentCaptainIndex={currentCaptainIndex}
      availablePlayers={availablePlayers}
      pickedPlayers={pickedPlayers}
      onPickPlayer={handlePickPlayer}
      onReset={handleReset}
      isDraftComplete={isDraftComplete}
      onUndoPick={handleUndoPick}
      canUndo={pickHistory.length > 0}
    />
  )
}
