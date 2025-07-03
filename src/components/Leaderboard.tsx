import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  position: number;
}

interface LeaderboardProps {
  currentScore: number;
}

export default function Leaderboard({ currentScore }: LeaderboardProps) {
  // Симуляция данных лидерборда (в реальном приложении это будет из API)
  const generateLeaderboard = (): LeaderboardEntry[] => {
    const names = [
      "Лягушкин",
      "КликМастер",
      "ЗеленыйГений",
      "МонетныйБарон",
      "АвтоКликер",
    ];
    const baseScores = [50000, 35000, 28000, 15000, 8000];

    return names.map((name, index) => ({
      id: `player-${index}`,
      name,
      score: baseScores[index] + Math.floor(Math.random() * 5000),
      position: index + 1,
    }));
  };

  const leaderboard = generateLeaderboard();
  const currentPosition =
    leaderboard.findIndex((entry) => currentScore > entry.score) + 1 ||
    leaderboard.length + 1;

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return `${position}`;
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
        <Icon name="BarChart3" size={20} />
        Таблица лидеров
      </h3>

      {/* Текущая позиция игрока */}
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-blue-700">
              Ваша позиция:
            </span>
            <Badge variant="outline" className="border-blue-300 text-blue-700">
              #{currentPosition}
            </Badge>
          </div>
          <div className="text-lg font-bold text-blue-700">
            {currentScore.toLocaleString()} 🪙
          </div>
        </div>
      </div>

      {/* Список лидеров */}
      <div className="space-y-2">
        {leaderboard.map((entry) => (
          <div
            key={entry.id}
            className={`p-3 border rounded-lg transition-all ${
              entry.position <= 3
                ? "border-yellow-200 bg-yellow-50"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-xl font-bold min-w-[40px] text-center">
                  {getRankIcon(entry.position)}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{entry.name}</h4>
                  <p className="text-sm text-gray-600">
                    Игрок #{entry.position}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-green-700">
                  {entry.score.toLocaleString()} 🪙
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-green-100 rounded-lg text-center">
        <p className="text-sm text-green-700">
          {currentPosition <= 5
            ? `Вы в топ-${currentPosition}! Отличная работа! 🎉`
            : `Кликайте больше, чтобы попасть в топ-5! 🐸`}
        </p>
      </div>
    </Card>
  );
}
