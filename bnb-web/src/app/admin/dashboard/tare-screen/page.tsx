'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect, useRef } from "react"
import { connectMQTT } from "@/lib/mqttClient"
import type { MqttClient } from 'mqtt'

const ITEM_OPTIONS = [
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

type ButtonState = 'neutral' | 'yellow' | 'green'

export default function TareScreen() {
  const [buttonStates, setButtonStates] = useState<ButtonState[]>(Array(16).fill('neutral'))
  const [formShelfLetter, setFormShelfLetter] = useState('A')
  const [formShelfNumber, setFormShelfNumber] = useState('0')
  const [formItemType, setFormItemType] = useState(ITEM_OPTIONS[0])
  const [formItemQuantity, setFormItemQuantity] = useState('1')
  const mqttRef = useRef<MqttClient | null>(null)

  useEffect(() => {
    const mqttClient = connectMQTT()
    mqttRef.current = mqttClient

    mqttClient.subscribe('shelf/data')

    mqttClient.on('message', (topic: string, message: Buffer) => {
      if (topic === 'shelf/data') {
        const data = JSON.parse(message.toString())
        console.log('Tare status received:', data)
      }
    })

    return () => {
      mqttClient.end()
    }
  }, [])

  const cycleState = async (index: number) => {
    const shelfNumber = Math.floor(index / 4)
    const slotIndex = index % 4
    const mac = getMacForShelf(shelfNumber)

    setButtonStates(prevStates => {
      const newStates = [...prevStates]
      newStates[index] = 'yellow'
      return newStates
    })

    const payload = {
      shelves: {
        [mac]: {
          slots: [slotIndex]
        }
      }
    }

    mqttRef.current?.publish('shelf/data', JSON.stringify(payload), { qos: 1 }, (err) => {
      if (!err) {
        setButtonStates(prevStates => {
          const newStates = [...prevStates]
          newStates[index] = 'green'
          return newStates
        })
      } else {
        console.error('Failed to publish MQTT message:', err)
      }
    })
  }

  const getMacForShelf = (shelfNumber: number): string => {
    const shelfMacMap: Record<number, string> = {
      0: "80:65:99:49:EF:8E",
      1: "80:65:99:E3:EF:50",
      2: "80:65:99:E3:8B:92",
      3: "MAC_1"
    }
    return shelfMacMap[shelfNumber]
  }

  const getButtonStyles = (state: ButtonState) => {
    switch (state) {
      case 'yellow':
        return 'bg-yellow-500 text-black hover:bg-yellow-600'
      case 'green':
        return 'bg-green-500 text-white hover:bg-green-600'
      default:
        return 'bg-secondary text-white hover:bg-secondary/80'
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

  const resetButtons = () => setButtonStates(Array(16).fill('neutral'))

  const tareAll = () => {
    const newStates = Array(16).fill('yellow')
    setButtonStates(newStates)

    const macMap: Record<string, number[]> = {}
    for (let i = 0; i < 16; i++) {
      const shelfNum = Math.floor(i / 4)
      const slotIndex = i % 4
      const mac = getMacForShelf(shelfNum)
      if (!macMap[mac]) macMap[mac] = []
      macMap[mac].push(slotIndex)
    }

    const payload = {
      shelves: Object.fromEntries(
        Object.entries(macMap).map(([mac, slots]) => [mac, { slots }])
      )
    }

    mqttRef.current?.publish('shelf/data', JSON.stringify(payload), { qos: 1 })
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

        <div className="flex justify-center gap-4 pt-4">
          <Button onClick={resetButtons} className="bg-red-500 hover:bg-red-600 text-white">Reset All</Button>
          <Button onClick={tareAll} className="bg-yellow-500 hover:bg-yellow-600 text-black">Tare All</Button>
        </div>

        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">Update Shelf Info</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label>Shelf</Label>
              <Select onValueChange={setFormShelfNumber} defaultValue={formShelfNumber}>
                <SelectTrigger>
                  <SelectValue className="text-grey" placeholder="Select number" />
                </SelectTrigger>
                <SelectContent>
                  {[0, 1, 2, 3].map(num => (
                    <SelectItem key={num} value={num.toString()} className="text-grey">{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Slot</Label>
              <Select onValueChange={setFormShelfLetter} defaultValue={formShelfLetter}>
                <SelectTrigger>
                  <SelectValue className="text-grey" placeholder="Select letter" />
                </SelectTrigger>
                <SelectContent>
                  {['A', 'B', 'C', 'D'].map(letter => (
                    <SelectItem key={letter} value={letter} className="text-grey">{letter}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Item Type</Label>
              <Select onValueChange={setFormItemType} defaultValue={formItemType}>
                <SelectTrigger>
                  <SelectValue className="text-grey" placeholder="Select item" />
                </SelectTrigger>
                <SelectContent>
                  {ITEM_OPTIONS.map(item => (
                    <SelectItem key={item} value={item} className="text-grey">{item}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Quantity</Label>
              <Input type="number" value={formItemQuantity} onChange={e => setFormItemQuantity(e.target.value)} />
            </div>
          </div>
            <div className="col-span-2 flex justify-center mt-4">
            <Button
              onClick={() => {
                const shelfIndex = parseInt(formShelfNumber)
                const slotIndex = ['A', 'B', 'C', 'D'].indexOf(formShelfLetter)
                const mac = getMacForShelf(shelfIndex)

                const payload = {
                  shelves: {
                    [mac]: {
                      slotInfo: {
                        [slotIndex]: {
                          type: formItemType,
                          quantity: parseInt(formItemQuantity)
                        }
                      }
                    }
                  }
                }

                mqttRef.current?.publish('shelf/data', JSON.stringify(payload), { qos: 1 }, (err) => {
                  if (err) {
                    console.error("Failed to publish item update:", err)
                  } else {
                    console.log("Item info update published:", payload)
                  }
                })
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
