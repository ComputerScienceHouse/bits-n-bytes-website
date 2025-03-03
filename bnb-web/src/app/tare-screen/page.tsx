'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

type ButtonState = 'neutral' | 'yellow' | 'green'

export default function TareScreen() {
  // Initialize state for all 16 buttons
  const [buttonStates, setButtonStates] = useState<ButtonState[]>(Array(16).fill('neutral'))

  // Function to cycle through button states
  const cycleState = (index: number) => {
    setButtonStates(prevStates => {
      const newStates = [...prevStates]
      switch (newStates[index]) {
        case 'neutral':
          newStates[index] = 'yellow'
          break
        case 'yellow':
          newStates[index] = 'green'
          break
        case 'green':
          newStates[index] = 'neutral'
          break
      }
      return newStates
    })
  }

  // Function to get button color based on state
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

  // Function to create a shelf of buttons
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
        
        {/* Top row - Shelves 1 and 2 */}
        <div className="grid md:grid-cols-2 gap-8">
          {renderShelf(1, 0)}
          {renderShelf(2, 4)}
        </div>
        
        {/* Bottom row - Shelves 3 and 4 */}
        <div className="grid md:grid-cols-2 gap-8">
          {renderShelf(3, 8)}
          {renderShelf(4, 12)}
        </div>
      </div>
    </div>
  )
}