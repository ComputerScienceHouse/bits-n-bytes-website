'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect, useRef } from "react"
import { connectMQTT } from "@/lib/mqttClient"

type ButtonState = 'neutral' | 'yellow' | 'green'

export default function TareScreen() {
  const [buttonStates, setButtonStates] = useState<ButtonState[]>(Array(16).fill('neutral'))
  const mqttRef = useRef<any>(null)

  useEffect(() => {
    const mqttClient = connectMQTT()
    mqttRef.current = mqttClient

    mqttClient.subscribe('tare/status')

    mqttClient.on('message', (topic: string, message: Buffer) => {
      if (topic === 'tare/status') {
        const data = JSON.parse(message.toString())
        console.log('Tare status received:', data)
      }
    })

    return () => {
      mqttClient.end()
    }
  }, [])

  const cycleState = (index: number) => {
    setButtonStates(prevStates => {
      const newStates = [...prevStates]
      const current = newStates[index]

      let next: ButtonState
      switch (current) {
        case 'neutral':
          next = 'yellow'
          break
        case 'yellow':
          next = 'green'
          break
        case 'green':
          next = 'neutral'
          break
      }

      newStates[index] = next

      // Only send MQTT on transition TO green
      if (next === 'green') {
        const shelfNumber = Math.floor(index / 4) + 1
        const slotIndex = index % 4
        const mac = getMacForShelf(shelfNumber)

        const tarePayload = {
          mac,
          slot: slotIndex
        }

        mqttRef.current?.publish('tare/update', JSON.stringify(tarePayload))
        console.log('MQTT Tare Sent:', tarePayload)
      }

      return newStates
    })
  }

  const getMacForShelf = (shelfNumber: number): string => {
    const shelfMacMap: Record<number, string> = {
      1: "80:65:99:49:EF:8E",
      2: "80:65:99:E3:EF:50",
      3: "80:65:99:E3:8B:92",
      4: "MAC_1"
    }
    return shelfMacMap[shelfNumber]
  }

  const getButtonStyles = (state: ButtonState) => {
    switch (state) {
      case 'yellow':
        return 'bg-yellow-500 hover:bg-yellow-600'
      case 'green':
        return 'bg-green-500 hover:bg-green-600'
      default:
        return 'bg-secondary hover:bg-secondary/80'
    }
  }

  const renderShelf = (shelfNumber: number, startIndex: number) => {
    const positions = ['A', 'B', 'C', 'D']

    return (
      <Card className="p-4">
        <CardHeader className="p-2">
          <CardTitle className="text-xl text-center">Shelf {shelfNumber}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 justify-center">
            {positions.map((position, idx) => {
              const buttonIndex = startIndex + idx
              return (
                <Button
                  key={`${shelfNumber}${position}`}
                  onClick={() => cycleState(buttonIndex)}
                  className={`h-16 w-24 text-lg font-semibold transition-colors ${getButtonStyles(buttonStates[buttonIndex])}`}
                >
                  {shelfNumber}{position}
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-5xl mx-auto space-y-8 pt-8">
        <h1 className="text-3xl font-bold text-center mb-8">Tare Screen</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {renderShelf(1, 0)}
          {renderShelf(2, 4)}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {renderShelf(3, 8)}
          {renderShelf(4, 12)}
        </div>
      </div>
    </div>
  )
}
