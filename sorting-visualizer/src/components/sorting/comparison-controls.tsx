"use client"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { SortingAlgorithm } from "@/types/Animation"

type ComparisonControlsProps = {
  isSorting: boolean
  currentAlgorithm: SortingAlgorithm
  secondAlgorithm: SortingAlgorithm
  setCurrentAlgorithm: (algo: SortingAlgorithm) => void
  setSecondAlgorithm: (algo: SortingAlgorithm) => void
  runComparison: (firstAlgo: SortingAlgorithm, secondAlgo: SortingAlgorithm) => void
}

export function ComparisonControls({
  isSorting,
  currentAlgorithm,
  secondAlgorithm,
  setCurrentAlgorithm,
  setSecondAlgorithm,
  runComparison,
}: ComparisonControlsProps) {
  const getItemClass = (algo: SortingAlgorithm, selected: SortingAlgorithm) =>
    `cursor-pointer ${algo === selected ? "text-white bg-blue-600" : ""}`

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div>
        <Select
          onValueChange={(value) => setCurrentAlgorithm(value as SortingAlgorithm)}
          disabled={isSorting}
          value={currentAlgorithm || undefined}
        >
          <SelectTrigger className="cursor-pointer bg-slate-800 border-slate-700 text-white">
            <SelectValue placeholder="Select first algorithm" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className={getItemClass("bubble", currentAlgorithm)} value="bubble">Bubble Sort</SelectItem>
            <SelectItem className={getItemClass("insertion", currentAlgorithm)} value="insertion">Insertion Sort</SelectItem>
            <SelectItem className={getItemClass("selection", currentAlgorithm)} value="selection">Selection Sort</SelectItem>
            <SelectItem className={getItemClass("merge", currentAlgorithm)} value="merge">Merge Sort</SelectItem>
            <SelectItem className={getItemClass("quick", currentAlgorithm)} value="quick">Quick Sort</SelectItem>
            <SelectItem className={getItemClass("cycle", currentAlgorithm)} value="cycle">Cycle Sort</SelectItem>
            <SelectItem className={getItemClass("radix", currentAlgorithm)} value="radix">Radix Sort</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Select
          onValueChange={(value) => setSecondAlgorithm(value as SortingAlgorithm)}
          disabled={isSorting}
          value={secondAlgorithm || undefined}
        >
          <SelectTrigger className="cursor-pointer bg-slate-800 border-slate-700 text-white">
            <SelectValue placeholder="Select second algorithm" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className={getItemClass("bubble", secondAlgorithm)} value="bubble">Bubble Sort</SelectItem>
            <SelectItem className={getItemClass("insertion", secondAlgorithm)} value="insertion">Insertion Sort</SelectItem>
            <SelectItem className={getItemClass("selection", secondAlgorithm)} value="selection">Selection Sort</SelectItem>
            <SelectItem className={getItemClass("merge", secondAlgorithm)} value="merge">Merge Sort</SelectItem>
            <SelectItem className={getItemClass("quick", secondAlgorithm)} value="quick">Quick Sort</SelectItem>
            <SelectItem className={getItemClass("cycle", secondAlgorithm)} value="cycle">Cycle Sort</SelectItem>
            <SelectItem className={getItemClass("radix", secondAlgorithm)} value="radix">Radix Sort</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="md:col-span-2">
        <Button
          onClick={() => runComparison(currentAlgorithm!, secondAlgorithm!)}
          disabled={isSorting || !currentAlgorithm || !secondAlgorithm}
          className="cursor-pointer w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 text-white"
        >
          Compare Algorithms
        </Button>
      </div>
    </div>
  )
}
