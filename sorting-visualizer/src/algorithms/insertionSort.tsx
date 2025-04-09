import { Animation } from "@/types/Animation";

export function insertionSort(array: number[], animations: Animation[]): number[] {
  const n = array.length;

  for (let i = 1; i < n; i++) {
    const item = array[i];
    let j = i - 1;

    
    if (i === 1) {
      animations.push({ type: "sorted", indices: [0] });
    }

    while (j >= 0 && array[j] > item) {
      animations.push({ type: "compare", indices: [j, j + 1] });

      array[j + 1] = array[j];
      animations.push({ type: "overwrite", indices: [j + 1], values: [array[j]] });

      j--;
    }

    animations.push({ type: "overwrite", indices: [j + 1], values: [item] });
    array[j + 1] = item;

    animations.push({ type: "sorted", indices: [i] });
  }

  return array;
}
