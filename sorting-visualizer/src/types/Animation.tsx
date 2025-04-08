export type Animation={
type:"compare" | "swap" | "overwrite" | "sorted";
indices: number[],
values?: number[]
}