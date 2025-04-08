import { Animation } from "@/types/Animation";

export function selectionSort(array: number[], animations: Animation[]): number[] {
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    for (let j = i + 1; j < n; j++) {
      animations.push({ type: "compare", indices: [minIdx, j] });

      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }

    if (i !== minIdx) {
      animations.push({ type: "swap", indices: [i, minIdx] });
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
    }

    animations.push({ type: "sorted", indices: [i] });
  }

  animations.push({ type: "sorted", indices: [n - 1] });

  return array;
}
