'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect, useRef } from "react"
import { connectMQTT } from "@/lib/mqttClient"
import type { MqttClient } from 'mqtt'

type ButtonState = 'neutral' | 'yellow' | 'green'

export default function TareScreen() {
  const [buttonStates, setButtonStates] = useState<ButtonState[]>(Array(16).fill('neutral'))
  const [itemData, setItemData] = useState<Record<string, { item: string; quantity: number }>>({})
  const [pendingTare, setPendingTare] = useState<Record<string, number[]>>({})

  const [formShelfLetter, setFormShelfLetter] = useState('A')
  const [formShelfNumber, setFormShelfNumber] = useState(0)
  const [formItemType, setFormItemType] = useState('Sour Patch Kids')
  const [formItemQuantity, setFormItemQuantity] = useState(0)

  const itemOptions = [
    'Sour Patch Kids', 
    'Skittles Gummies',
    'Little Bites Chocolate',
    'Little Bites Party',
    'Little Bites Blueberry', 
    'Swedish Fish Mini Tropical',
    'Swedish Fish Original',
    'Welch\'s Fruit Snacks',
    'Brownie Brittle Chocolate Chip', 
    '12 Pack Wild Cherry Pepsi', 
    '12 Pack Loganberry',
    'Wild Cherry Pepsi Can',
    'EMPTY']

  const mqttRef = useRef<MqttClient | null>(null)

  useEffect(() => {
    const mqttClient = connectMQTT()
    mqttRef.current = mqttClient

    mqttClient.subscribe('shelf/tare')

    mqttClient.on('message', (topic: string, message: Buffer) => {
      if (topic === 'shelf/tare') {
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

      if (next === 'green') {
        const shelfIndex = Math.floor(index / 4)
        const slotIndex = index % 4
        const mac = getMacForShelf(shelfIndex)

        setPendingTare(prev => {
          const updated = { ...prev }
          if (!updated[mac]) {
            updated[mac] = []
          }
          if (!updated[mac].includes(slotIndex)) {
            updated[mac].push(slotIndex)
          }
          return updated
        })
      }

      return newStates
    })
  }

  const getMacForShelf = (shelfIndex: number): string => {
    const shelfMacMap: Record<number, string> = {
      0: "80:65:99:49:EF:8E",
      1: "80:65:99:E3:EF:50",
      2: "80:65:99:E3:8B:92",
      3: "MAC_1"
    }
    return shelfMacMap[shelfIndex]
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
              const key = `${shelfNumber}${position}`
              const item = itemData[key]?.item || ''
              const quantity = itemData[key]?.quantity || ''
              return (
                <div className="flex flex-col items-center space-y-1" key={key}>
                  <Button
                    onClick={() => cycleState(buttonIndex)}
                    className={`h-16 w-24 text-lg font-semibold transition-colors ${getButtonStyles(buttonStates[buttonIndex])}`}
                  >
                    {shelfNumber}{position}
                  </Button>
                  <span className="text-sm text-muted-foreground">{item}</span>
                  <span className="text-sm text-muted-foreground">Qty: {quantity}</span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    )
  }

  const handleSubmitForm = () => {
    const key = `${formShelfNumber}${formShelfLetter}`
    setItemData(prev => ({
      ...prev,
      [key]: {
        item: formItemType,
        quantity: formItemQuantity
      }
    }))
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-5xl mx-auto space-y-8 pt-8">
        <h1 className="text-3xl font-bold text-center mb-8">Tare Screen</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {renderShelf(0, 0)}
          {renderShelf(1, 4)}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {renderShelf(2, 8)}
          {renderShelf(3, 12)}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Button
            onClick={() => setButtonStates(Array(16).fill('neutral'))}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded"
          >
            Reset
          </Button>

          <Button
            onClick={() => setButtonStates(Array(16).fill('yellow'))}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded"
          >
            Tare All
          </Button>
        </div>

        <Button
          onClick={() => {
            const payload = {
              shelves: pendingTare
            }

            mqttRef.current?.publish(
              'tare/update',
              JSON.stringify(payload),
              { qos: 1 },
              err => {
                if (err) {
                  console.error('Failed to publish:', err)
                } else {
                  console.log('Tare request sent:', payload)
                  setPendingTare({})
                }
              }
            )
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        >
          Tare Selected
        </Button>

        <div className="mt-8 p-4 border rounded space-y-4 bg-card">
          <h2 className="text-xl font-semibold">Update Shelf Item</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Shelf Letter</label>
              <select
                value={formShelfLetter}
                onChange={e => setFormShelfLetter(e.target.value)}
                className="w-full border border-input rounded px-3 py-2 text-foreground bg-background"
              >
                {['A', 'B', 'C', 'D'].map(letter => (
                  <option key={letter} value={letter}>{letter}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Shelf Number</label>
              <select
                value={formShelfNumber}
                onChange={e => setFormShelfNumber(Number(e.target.value))}
                className="w-full border border-input rounded px-3 py-2 text-foreground bg-background"
              >
                {[0, 1, 2, 3].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Item Type</label>
              <select
                value={formItemType}
                onChange={e => setFormItemType(e.target.value)}
                className="w-full border border-input rounded px-3 py-2 text-foreground bg-background"
              >
                {itemOptions.map(item => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Quantity</label>
              <input
                type="number"
                min={0}
                value={formItemQuantity}
                onChange={e => setFormItemQuantity(Number(e.target.value))}
                className="w-full border border-input rounded px-3 py-2 text-foreground bg-background"
              />
            </div>
          </div>

          <Button onClick={handleSubmitForm} className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
}
