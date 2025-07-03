import { useState } from "react";
import FrogClicker from "@/components/FrogClicker";
import UpgradeShop from "@/components/UpgradeShop";
import Achievements from "@/components/Achievements";
import Leaderboard from "@/components/Leaderboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  icon: string;
  type: "multiplier" | "autoclicker";
}

const Index = () => {
  const [totalCoins, setTotalCoins] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [clickMultiplier, setClickMultiplier] = useState(1);
  const [autoClickerRate, setAutoClickerRate] = useState(0);

  const handleScoreUpdate = (newScore: number) => {
    setTotalCoins(newScore);
    setTotalClicks((prev) => prev + 1);
  };

  const handleUpgradePurchase = (upgrade: Upgrade) => {
    if (totalCoins >= upgrade.cost) {
      setTotalCoins((prev) => prev - upgrade.cost);

      if (upgrade.type === "multiplier") {
        if (upgrade.id === "click-x2") {
          setClickMultiplier((prev) => prev * 2);
        } else if (upgrade.id === "click-x5") {
          setClickMultiplier((prev) => prev * 5);
        }
      } else if (upgrade.type === "autoclicker") {
        if (upgrade.id === "auto-click-1") {
          setAutoClickerRate((prev) => prev + 1);
        } else if (upgrade.id === "auto-click-5") {
          setAutoClickerRate((prev) => prev + 5);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-emerald-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Игровое поле */}
          <div className="lg:col-span-1">
            <FrogClicker
              onScoreUpdate={handleScoreUpdate}
              clickMultiplier={clickMultiplier}
              autoClickerRate={autoClickerRate}
            />
          </div>

          {/* Правая панель с табами */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="shop" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="shop">Магазин</TabsTrigger>
                <TabsTrigger value="achievements">Достижения</TabsTrigger>
                <TabsTrigger value="leaderboard">Лидеры</TabsTrigger>
              </TabsList>

              <TabsContent value="shop">
                <UpgradeShop
                  coins={totalCoins}
                  onPurchase={handleUpgradePurchase}
                  clickMultiplier={clickMultiplier}
                  autoClickerRate={autoClickerRate}
                />
              </TabsContent>

              <TabsContent value="achievements">
                <Achievements
                  totalClicks={totalClicks}
                  totalCoins={totalCoins}
                />
              </TabsContent>

              <TabsContent value="leaderboard">
                <Leaderboard currentScore={totalCoins} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
