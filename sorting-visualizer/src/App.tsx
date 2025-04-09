import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'
import VisualizerPage from './pages/SortingVisualizer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/visualizer" element={<VisualizerPage/>}/>

      </Routes>
    </Router>
  );
}

export default App;
