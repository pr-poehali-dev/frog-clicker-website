import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FrogClickerProps {
  onScoreUpdate: (score: number) => void;
  clickMultiplier: number;
  autoClickerRate: number;
}

export default function FrogClicker({
  onScoreUpdate,
  clickMultiplier,
  autoClickerRate,
}: FrogClickerProps) {
  const [score, setScore] = useState(0);
  const [isClicking, setIsClicking] = useState(false);

  // Auto clicker effect
  useEffect(() => {
    if (autoClickerRate > 0) {
      const interval = setInterval(() => {
        setScore((prev) => {
          const newScore = prev + autoClickerRate;
          onScoreUpdate(newScore);
          return newScore;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [autoClickerRate, onScoreUpdate]);

  const handleFrogClick = () => {
    setIsClicking(true);
    const pointsGained = 1 * clickMultiplier;
    const newScore = score + pointsGained;
    setScore(newScore);
    onScoreUpdate(newScore);

    setTimeout(() => setIsClicking(false), 150);
  };

  return (
    <Card className="p-8 text-center bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-green-800 mb-2">
          Лягушка Кликер
        </h2>
        <div className="text-4xl font-bold text-green-600">
          {score.toLocaleString()} 🪙
        </div>
        <div className="text-sm text-green-600 mt-1">монет</div>
      </div>

      <div className="mb-6">
        <Button
          onClick={handleFrogClick}
          className={`w-32 h-32 rounded-full bg-green-500 hover:bg-green-600 text-6xl transition-all duration-150 ${
            isClicking ? "scale-95 bg-green-600" : "scale-100"
          }`}
          variant="default"
        >
          🐸
        </Button>
      </div>

      <div className="text-sm text-green-700 space-y-1">
        <div>За клик: +{clickMultiplier} монет</div>
        {autoClickerRate > 0 && <div>Автоклик: +{autoClickerRate}/сек</div>}
      </div>
    </Card>
  );
}
