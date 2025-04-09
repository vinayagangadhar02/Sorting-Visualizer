import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

type AlgorithmInfoProps = {
  algorithm: string
}

export function AlgorithmInfo({ algorithm }: AlgorithmInfoProps) {
  const algorithmData = {
    bubble: {
      timeComplexity: {
        best: "O(n)",
        average: "O(n²)",
        worst: "O(n²)",
      },
      spaceComplexity: "O(1)",
      description:
        "Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they're in the wrong order. The pass through the list is repeated until the list is sorted.",
      stable: true,
    },
    insertion: {
      timeComplexity: {
        best: "O(n)",
        average: "O(n²)",
        worst: "O(n²)",
      },
      spaceComplexity: "O(1)",
      description:
        "Insertion Sort builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.",
      stable: true,
    },
    selection: {
      timeComplexity: {
        best: "O(n²)",
        average: "O(n²)",
        worst: "O(n²)",
      },
      spaceComplexity: "O(1)",
      description:
        "Selection Sort divides the input list into two parts: a sorted sublist of items which is built up from left to right, and a sublist of the remaining unsorted items. The algorithm repeatedly selects the smallest element from the unsorted sublist and moves it to the end of the sorted sublist.",
      stable: false,
    },
    merge: {
      timeComplexity: {
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n log n)",
      },
      spaceComplexity: "O(n)",
      description:
        "Merge Sort is an efficient, stable, comparison-based, divide and conquer algorithm. It divides the input array into two halves, recursively sorts them, and then merges the sorted halves.",
      stable: true,
    },
    quick: {
      timeComplexity: {
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n²)",
      },
      spaceComplexity: "O(log n)",
      description:
        "Quick Sort is an efficient sorting algorithm that uses a divide-and-conquer strategy. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays according to whether they are less than or greater than the pivot.",
      stable: false,
    },
    cycle: {
      timeComplexity: {
        best: "O(n²)",
        average: "O(n²)",
        worst: "O(n²)",
      },
      spaceComplexity: "O(1)",
      description:
        "Cycle Sort is an in-place, unstable sorting algorithm that is particularly useful when memory write operations are costly. It minimizes the number of memory writes to sort.",
      stable: false,
    },
    radix: {
      timeComplexity: {
        best: "O(nk)",
        average: "O(nk)",
        worst: "O(nk)",
      },
      spaceComplexity: "O(n+k)",
      description:
        "Radix Sort is a non-comparative integer sorting algorithm that sorts data with integer keys by grouping keys by individual digits which share the same significant position and value.",
      stable: true,
    },
  }

  const data = algorithmData[algorithm as keyof typeof algorithmData]

  if (!data) return null

  return (
    <Accordion  type="single" collapsible className="w-full">
      <AccordionItem value="info" className="border-slate-700  ">
        <AccordionTrigger className="text-gray-200 hover:text-white cursor-pointer">Algorithm Information</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2 text-sm">
            <p className="text-gray-300">{data.description}</p>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <h4 className="font-medium text-gray-200">Time Complexity</h4>
                <ul className="list-disc list-inside text-gray-300">
                  <li>Best: {data.timeComplexity.best}</li>
                  <li>Average: {data.timeComplexity.average}</li>
                  <li>Worst: {data.timeComplexity.worst}</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-200">Properties</h4>
                <ul className="list-disc list-inside text-gray-300">
                  <li>Space: {data.spaceComplexity}</li>
                  <li>Stable: {data.stable ? "Yes" : "No"}</li>
                </ul>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
