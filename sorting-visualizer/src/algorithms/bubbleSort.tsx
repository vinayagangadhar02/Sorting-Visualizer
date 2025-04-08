import { Animation } from "@/types/Animation";

export function bubbleSort(array: number[], animations: Animation[]): number[] {
  const n = array.length;
  let swapped = false;

  for (let i = 0; i < n - 1; i++) {
    swapped = false;
    for (let j = 0; j < n - 1 - i; j++) {
      animations.push({ type: "compare", indices: [j, j + 1] });
      if (array[j] > array[j + 1]) {
        animations.push({ type: "swap", indices: [j, j + 1] });
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swapped = true;
      }
    }
    animations.push({ type: "sorted", indices: [n - i - 1] });
    if (!swapped) {
      for (let k = 0; k < n - i - 1; k++) {
        animations.push({ type: "sorted", indices: [k] });
      }
      break;
    }
  }
  return array;
}
