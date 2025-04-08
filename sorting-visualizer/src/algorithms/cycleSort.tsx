import { Animation } from "@/types/Animation";

export function cycleSort(array: number[], animations: Animation[]): number[] {
  let i = 0;
  const n = array.length;

  while (i < n) {
    const correct = array[i] - 1;

   
    if (array[i] !== array[correct]) {
      animations.push({ type: "compare", indices: [i, correct] });
      animations.push({ type: "swap", indices: [i, correct] });

      [array[i], array[correct]] = [array[correct], array[i]];
    } else {
      animations.push({ type: "sorted", indices: [i] });
      i++;
    }
  }

  return array;
}
