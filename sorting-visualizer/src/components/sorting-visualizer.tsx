import { useState, useEffect, useRef } from "react"
import { AlgorithmControls } from "@/components/sorting/algorithm-controls"
import { ComparisonControls } from "@/components/sorting/comparison-controls"
import { SettingsControls } from "@/components/sorting/settings-controls"
import { VisualizationArea } from "@/components/sorting/visualization-area"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { bubbleSort } from "@/algorithms/bubbleSort"
import { selectionSort } from "@/algorithms/selectionSort"
import { insertionSort } from "@/algorithms/insertionSort"
import { cycleSort } from "@/algorithms/cycleSort"
import type { Animation,SortingAlgorithm } from "@/types/Animation"

export default function SortingVisualizer() {
  const [array, setArray] = useState<number[]>([])
  const [secondArray, setSecondArray] = useState<number[]>([])
  const [arraySize, setArraySize] = useState<number>(50)
  const [speed, setSpeed] = useState<number>(50)
  const [isSorting, setIsSorting] = useState<boolean>(false)
  const [currentAlgorithm, setCurrentAlgorithm] = useState<SortingAlgorithm>(null)
  const [secondAlgorithm, setSecondAlgorithm] = useState<SortingAlgorithm>(null)
  const [comparingIndices, setComparingIndices] = useState<number[]>([])
  const [swappingIndices, setSwappingIndices] = useState<number[]>([])
  const [sortedIndices, setSortedIndices] = useState<number[]>([])
  const [secondComparingIndices, setSecondComparingIndices] = useState<number[]>([])
  const [secondSwappingIndices, setSecondSwappingIndices] = useState<number[]>([])
  const [secondSortedIndices, setSecondSortedIndices] = useState<number[]>([])
  const [comparisonMode, setComparisonMode] = useState<boolean>(false)

  const animationsTimeoutRef = useRef<NodeJS.Timeout[]>([])
  const secondAnimationsTimeoutRef = useRef<NodeJS.Timeout[]>([])

  
  
  const generateArray = () => {
    clearTimeouts()
    setComparingIndices([])
    setSwappingIndices([])
    setSortedIndices([])
    setSecondComparingIndices([])
    setSecondSwappingIndices([])
    setSecondSortedIndices([])

    const newArray = []
    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.floor(Math.random() * 500) + 10)
    }
    setArray(newArray)
    setSecondArray([...newArray])
  }


  const clearTimeouts = () => {
    animationsTimeoutRef.current.forEach((timeout) => clearTimeout(timeout))
    animationsTimeoutRef.current = []
    secondAnimationsTimeoutRef.current.forEach((timeout) => clearTimeout(timeout))
    secondAnimationsTimeoutRef.current = []
  }

  useEffect(() => {
    generateArray()
  }, [arraySize])


  useEffect(() => {
    return () => clearTimeouts()
  }, [])

  useEffect(() => {
    if (isSorting) {
      clearTimeouts()

      if (currentAlgorithm) {
        runSortingAlgorithm(currentAlgorithm)
        if (comparisonMode && secondAlgorithm) {
          runSortingAlgorithm(secondAlgorithm, true)
        }
      }
    }
  }, [speed])

  const getAnimationDelay = () => {
    return 1000 - speed * 9 
  }

  const runSortingAlgorithm = (algorithm: SortingAlgorithm, isSecondary = false) => {
    const isSpeedChange =
      isSorting && ((isSecondary && algorithm === secondAlgorithm) || (!isSecondary && algorithm === currentAlgorithm))

    if (isSorting && !isSpeedChange) return

   
    const currentProgress = {
      array: isSecondary ? [...secondArray] : [...array],
      sortedIndices: isSecondary ? [...secondSortedIndices] : [...sortedIndices],
    }

    if (!isSecondary) {
      if (!isSpeedChange) {
        setIsSorting(true)
        setCurrentAlgorithm(algorithm)
      }
      clearTimeouts()
      setComparingIndices([])
      setSwappingIndices([])
      if (!isSpeedChange) {
        setSortedIndices([])
      }
    } else {
      if (!isSpeedChange) {
        setSecondAlgorithm(algorithm)
      }
      setSecondComparingIndices([])
      setSecondSwappingIndices([])
      if (!isSpeedChange) {
        setSecondSortedIndices([])
      }
    }

    const animations: Animation[] = []

   
    const arrayCopy = isSpeedChange ? currentProgress.array : isSecondary ? [...secondArray] : [...array]

    switch (algorithm) {
      case "bubble":
        bubbleSort(arrayCopy, animations)
        break
      case "insertion":
        insertionSort(arrayCopy, animations)
        break
      case "selection":
        selectionSort(arrayCopy, animations)
        break
      // case "merge":
      //   mergeSort(arrayCopy, animations)
      //   break
      // case "quick":
      //   quickSort(arrayCopy, animations)
      //   break
      // case "cycle":
      //   cycleSort(arrayCopy, animations)
      //   break
      // case "radix":
      //   radixSort(arrayCopy, animations)
      //   break
      default:
        if (!isSecondary && !isSpeedChange) setIsSorting(false)
        return
    }

  
    const delay = getAnimationDelay()
    const timeoutRef = isSecondary ? secondAnimationsTimeoutRef : animationsTimeoutRef

    const startIndex = isSpeedChange ? Math.floor(currentProgress.sortedIndices.length / 2) : 0

    animations.slice(startIndex).forEach((animation, index) => {
      const timeout = setTimeout(() => {
        const { type, indices, values } = animation

        if (isSecondary) {
          if (type === "compare") {
            setSecondComparingIndices(indices)
            setSecondSwappingIndices([])
          } else if (type === "swap") {
            setSecondComparingIndices([])
            setSecondSwappingIndices(indices)

            setSecondArray((prevArray) => {
              const newArray = [...prevArray]
              const [i, j] = indices
              ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
              return newArray
            })
          } else if (type === "overwrite") {
            setSecondComparingIndices([])
            setSecondSwappingIndices(indices)

            setSecondArray((prevArray) => {
              const newArray = [...prevArray]
              const [i] = indices
              if (values) newArray[i] = values[0]
              return newArray
            })
          } else if (type === "sorted") {
            setSecondSortedIndices((prev) => [...prev, ...indices])
          }
        } else {
          if (type === "compare") {
            setComparingIndices(indices)
            setSwappingIndices([])
          } else if (type === "swap") {
            setComparingIndices([])
            setSwappingIndices(indices)

            setArray((prevArray) => {
              const newArray = [...prevArray]
              const [i, j] = indices
              ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
              return newArray
            })
          } else if (type === "overwrite") {
            setComparingIndices([])
            setSwappingIndices(indices)

            setArray((prevArray) => {
              const newArray = [...prevArray]
              const [i] = indices
              if (values) newArray[i] = values[0]
              return newArray
            })
          } else if (type === "sorted") {
            setSortedIndices((prev) => [...prev, ...indices])
          }
        }

      
        if (index === animations.slice(startIndex).length - 1) {
          if (isSecondary) {
            setSecondComparingIndices([])
            setSecondSwappingIndices([])
            setSecondSortedIndices([...Array(secondArray.length).keys()])
          } else {
            setComparingIndices([])
            setSwappingIndices([])
            setSortedIndices([...Array(array.length).keys()])
            if (!comparisonMode || !secondAlgorithm) {
              setIsSorting(false)
            }
          }

        
          if (comparisonMode && isSecondary && currentAlgorithm) {
            setIsSorting(false)
          }
        }
      }, index * delay)

      timeoutRef.current.push(timeout)
    })
  }

 
  const resetArray = () => {
    if (isSorting) {
      clearTimeouts()
      setIsSorting(false)
    }
    setCurrentAlgorithm(null)
    setSecondAlgorithm(null)
    generateArray()
  }


  const handleSetComparisonMode = (value: boolean) => {
    if (isSorting) return
    setComparisonMode(value)
    resetArray()
  }


  const runComparison = (firstAlgo: SortingAlgorithm, secondAlgo: SortingAlgorithm) => {
    if (isSorting || !firstAlgo || !secondAlgo) return

    runSortingAlgorithm(firstAlgo)
    runSortingAlgorithm(secondAlgo, true)
  }


  const getBarColor = (index: number, isSecondary = false) => {
    const comparing = isSecondary ? secondComparingIndices : comparingIndices
    const swapping = isSecondary ? secondSwappingIndices : swappingIndices
    const sorted = isSecondary ? secondSortedIndices : sortedIndices

    if (sorted.includes(index)) return "bg-gradient-to-t from-emerald-500 to-green-400"
    if (comparing.includes(index)) return "bg-gradient-to-t from-amber-500 to-yellow-400"
    if (swapping.includes(index)) return "bg-gradient-to-t from-rose-600 to-red-500"
    return "bg-gradient-to-t from-blue-600 to-cyan-400"
  }

  return (
    <div className="w-full max-w-6xl backdrop-blur-sm bg-slate-900/70 p-6 rounded-xl shadow-xl border border-slate-800">
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <div className="flex items-center space-x-2">
          <Switch
            id="comparison-mode"
            checked={comparisonMode}
            onCheckedChange={handleSetComparisonMode}
            disabled={isSorting}
            className="cursor-pointer data-[state=checked]:bg-blue-700 data-[state=unchecked]:bg-blue-400"
          />
          <Label htmlFor="comparison-mode" className=" text-gray-200">
            Comparison Mode
          </Label>
        </div>

        <Button onClick={resetArray} variant="destructive" className="ml-auto cursor-pointer">
          Reset
        </Button>
      </div>

      {comparisonMode ? (
        <ComparisonControls
        isSorting={isSorting}
        currentAlgorithm={currentAlgorithm}
        secondAlgorithm={secondAlgorithm}
        setCurrentAlgorithm={setCurrentAlgorithm}
        setSecondAlgorithm={setSecondAlgorithm}
        runComparison={runComparison}
      />
      
      ) : (
        <AlgorithmControls
          isSorting={isSorting}
          currentAlgorithm={currentAlgorithm}
          runSortingAlgorithm={runSortingAlgorithm}
        />
      )}



      <VisualizationArea
        comparisonMode={comparisonMode}
        array={array}
        secondArray={secondArray}
        currentAlgorithm={currentAlgorithm}
        secondAlgorithm={secondAlgorithm}
        isSorting={isSorting}
        getBarColor={getBarColor}
        comparingIndices={comparingIndices}
        swappingIndices={swappingIndices}
        sortedIndices={sortedIndices}
        secondComparingIndices={secondComparingIndices}
        secondSwappingIndices={secondSwappingIndices}
        secondSortedIndices={secondSortedIndices}
      />
    </div>
  )
}
