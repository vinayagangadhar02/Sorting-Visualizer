"use client"

import { Slider } from "@/components/ui/slider"

type SettingsControlsProps = {
  arraySize: number
  speed: number
  isSorting: boolean
  setArraySize: (size: number) => void
  setSpeed: (speed: number) => void
}

export function SettingsControls({ arraySize, speed, isSorting, setArraySize, setSpeed }: SettingsControlsProps) {
  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-gray-300">
          <span>Array Size: {arraySize}</span>
          <span>Speed: {speed}</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Slider
              value={[arraySize]}
              min={10}
              max={100}
              step={1}
              disabled={isSorting}
              onValueChange={(value) => setArraySize(value[0])}
              className="py-2"
            />
          </div>
          <div>
            <Slider
              value={[speed]}
              min={1}
              max={100}
              step={1}
              onValueChange={(value) => setSpeed(value[0])}
              className="py-2"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
