import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const fullText = "Sorting Visualizer";

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          navigate("/visualizer");
        }, 1500);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
      <div className="text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 h-20 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
          {text}
          <span className="inline-block w-1 h-10 bg-purple-500 ml-1 animate-blink"></span>
        </h1>
        <p className="text-xl text-gray-300 animate-pulse">Loading visualizer...</p>
      </div>
    </div>
  );
};

export default LandingPage;
