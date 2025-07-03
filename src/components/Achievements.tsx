import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: number;
  unlocked: boolean;
}

interface AchievementsProps {
  totalClicks: number;
  totalCoins: number;
}

export default function Achievements({
  totalClicks,
  totalCoins,
}: AchievementsProps) {
  const achievements: Achievement[] = [
    {
      id: "first-click",
      name: "Первый клик",
      description: "Кликните лягушку первый раз",
      icon: "MousePointer2",
      requirement: 1,
      unlocked: totalClicks >= 1,
    },
    {
      id: "hundred-clicks",
      name: "Сто кликов",
      description: "Сделайте 100 кликов",
      icon: "Target",
      requirement: 100,
      unlocked: totalClicks >= 100,
    },
    {
      id: "rich-frog",
      name: "Богатая лягушка",
      description: "Накопите 1000 монет",
      icon: "Coins",
      requirement: 1000,
      unlocked: totalCoins >= 1000,
    },
    {
      id: "clicker-master",
      name: "Мастер кликера",
      description: "Сделайте 1000 кликов",
      icon: "Crown",
      requirement: 1000,
      unlocked: totalClicks >= 1000,
    },
    {
      id: "millionaire",
      name: "Миллионер",
      description: "Накопите 1,000,000 монет",
      icon: "Gem",
      requirement: 1000000,
      unlocked: totalCoins >= 1000000,
    },
  ];

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
        <Icon name="Trophy" size={20} />
        Достижения ({unlockedCount}/{achievements.length})
      </h3>

      <div className="space-y-3">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`p-3 border rounded-lg transition-all ${
              achievement.unlocked
                ? "border-yellow-200 bg-yellow-50"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon
                name={achievement.icon as any}
                size={20}
                className={
                  achievement.unlocked ? "text-yellow-600" : "text-gray-400"
                }
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4
                    className={`font-semibold ${achievement.unlocked ? "text-yellow-800" : "text-gray-600"}`}
                  >
                    {achievement.name}
                  </h4>
                  {achievement.unlocked && (
                    <Badge
                      variant="default"
                      className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                    >
                      ✓
                    </Badge>
                  )}
                </div>
                <p
                  className={`text-sm ${achievement.unlocked ? "text-yellow-600" : "text-gray-500"}`}
                >
                  {achievement.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-green-100 rounded-lg">
        <div className="text-sm text-green-700">
          <div>Всего кликов: {totalClicks.toLocaleString()}</div>
          <div>Всего монет: {totalCoins.toLocaleString()}</div>
        </div>
      </div>
    </Card>
  );
}
