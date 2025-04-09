import SortingVisualizer from "@/components/sorting-visualizer"

export default function VisualizerPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
      <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
        Sorting Algorithm Visualizer
      </h1>
      <SortingVisualizer />
    </main>
  )
}