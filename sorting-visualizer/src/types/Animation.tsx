export type Animation={
type:"compare" | "swap" | "overwrite" | "sorted";
indices: number[],
values?: number[]
}

export type SortingAlgorithm = "bubble" | "insertion" | "selection" | "merge" | "quick" | "cycle" | "radix" | null
