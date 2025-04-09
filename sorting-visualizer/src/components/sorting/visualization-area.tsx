import { AlgorithmInfo } from "@/components/algorithm-info"
import type { SortingAlgorithm } from "@/types/Animation"

type VisualizationAreaProps = {
  comparisonMode: boolean
  array: number[]
  secondArray: number[]
  currentAlgorithm: SortingAlgorithm
  secondAlgorithm: SortingAlgorithm
  isSorting: boolean
  getBarColor: (index: number, isSecondary?: boolean) => string
  comparingIndices: number[]
  swappingIndices: number[]
  sortedIndices: number[]
  secondComparingIndices: number[]
  secondSwappingIndices: number[]
  secondSortedIndices: number[]
}

export function VisualizationArea({
  comparisonMode,
  array,
  secondArray,
  currentAlgorithm,
  secondAlgorithm,
  isSorting,
  getBarColor

}: VisualizationAreaProps) {
  if (comparisonMode) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-center text-gray-200">
            {currentAlgorithm
              ? `${currentAlgorithm.charAt(0).toUpperCase() + currentAlgorithm.slice(1)} Sort`
              : "Algorithm 1"}
          </h3>
          <div className="h-[300px] w-full flex items-end justify-center border border-slate-700 rounded-lg p-4 bg-slate-800/50 backdrop-blur-sm shadow-inner">
            {array.map((value, index) => (
              <div
                key={index}
                className={`${getBarColor(index)} mx-[1px] w-full rounded-t-sm shadow-lg transition-all duration-200`}
                style={{
                  height: `${(value / 500) * 100}%`,
                }}
              ></div>
            ))}
          </div>
          {currentAlgorithm && <AlgorithmInfo algorithm={currentAlgorithm} />}
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium text-center text-gray-200">
            {secondAlgorithm
              ? `${secondAlgorithm.charAt(0).toUpperCase() + secondAlgorithm.slice(1)} Sort`
              : "Algorithm 2"}
          </h3>
          <div className="h-[300px] w-full flex items-end justify-center border border-slate-700 rounded-lg p-4 bg-slate-800/50 backdrop-blur-sm shadow-inner">
            {secondArray.map((value, index) => (
              <div
                key={index}
                className={`${getBarColor(index, true)} mx-[1px] w-full rounded-t-sm shadow-lg transition-all duration-200`}
                style={{
                  height: `${(value / 500) * 100}%`,
                }}
              ></div>
            ))}
          </div>
          {secondAlgorithm && <AlgorithmInfo algorithm={secondAlgorithm} />}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="h-[400px] w-full flex items-end justify-center border border-slate-700 rounded-lg p-4 bg-slate-800/50 backdrop-blur-sm shadow-inner">
        {array.map((value, index) => (
          <div
            key={index}
            className={`${getBarColor(index)} mx-[1px] w-full rounded-t-sm shadow-lg transition-all duration-200`}
            style={{
              height: `${(value / 500) * 100}%`,
            }}
          ></div>
        ))}
      </div>

      {currentAlgorithm && (
        <div className="mt-4 ">
          <div className="text-lg font-medium text-center mb-2 text-gray-200 ">
            {currentAlgorithm.charAt(0).toUpperCase() + currentAlgorithm.slice(1)} Sort
            {isSorting ? " (Sorting...)" : " (Completed)"}
          </div>
          <AlgorithmInfo algorithm={currentAlgorithm} />
        </div>
      )}
    </div>
  )
}
