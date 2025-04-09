"use client"

import { Button } from "@/components/ui/button"
import type { SortingAlgorithm } from "@/types/Animation"

type AlgorithmControlsProps = {
  isSorting: boolean
  currentAlgorithm: SortingAlgorithm
  runSortingAlgorithm: (algorithm: SortingAlgorithm) => void
}

export function AlgorithmControls({ isSorting, currentAlgorithm, runSortingAlgorithm }: AlgorithmControlsProps) {
  const getButtonClass = (algo: SortingAlgorithm) =>
    currentAlgorithm === algo
      ? "cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
      : "cursor-pointer border-slate-700 bg-slate-800 hover:bg-slate-700 text-white"

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        onClick={() => runSortingAlgorithm("bubble")}
        disabled={isSorting}
        variant={currentAlgorithm === "bubble" ? "default" : "outline"}
        className={getButtonClass("bubble")}
      >
        Bubble Sort
      </Button>
      <Button
        onClick={() => runSortingAlgorithm("insertion")}
        disabled={isSorting}
        variant={currentAlgorithm === "insertion" ? "default" : "outline"}
        className={getButtonClass("insertion")}
      >
        Insertion Sort
      </Button>
      <Button
        onClick={() => runSortingAlgorithm("selection")}
        disabled={isSorting}
        variant={currentAlgorithm === "selection" ? "default" : "outline"}
        className={getButtonClass("selection")}
      >
        Selection Sort
      </Button>
      <Button
        onClick={() => runSortingAlgorithm("merge")}
        disabled={isSorting}
        variant={currentAlgorithm === "merge" ? "default" : "outline"}
        className={getButtonClass("merge")}
      >
        Merge Sort
      </Button>
      <Button
        onClick={() => runSortingAlgorithm("quick")}
        disabled={isSorting}
        variant={currentAlgorithm === "quick" ? "default" : "outline"}
        className={getButtonClass("quick")}
      >
        Quick Sort
      </Button>
      <Button
        onClick={() => runSortingAlgorithm("cycle")}
        disabled={isSorting}
        variant={currentAlgorithm === "cycle" ? "default" : "outline"}
        className={getButtonClass("cycle")}
      >
        Cycle Sort
      </Button>
      <Button
        onClick={() => runSortingAlgorithm("radix")}
        disabled={isSorting}
        variant={currentAlgorithm === "radix" ? "default" : "outline"}
        className={getButtonClass("radix")}
      >
        Radix Sort
      </Button>
    </div>
  )
}
