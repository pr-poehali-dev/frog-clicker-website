import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  icon: string;
  type: "multiplier" | "autoclicker";
}

interface UpgradeShopProps {
  coins: number;
  onPurchase: (upgrade: Upgrade) => void;
  clickMultiplier: number;
  autoClickerRate: number;
}

export default function UpgradeShop({
  coins,
  onPurchase,
  clickMultiplier,
  autoClickerRate,
}: UpgradeShopProps) {
  const upgrades: Upgrade[] = [
    {
      id: "click-x2",
      name: "Двойной клик",
      description: "Удваивает монеты за клик",
      cost: 50,
      icon: "MousePointer2",
      type: "multiplier",
    },
    {
      id: "auto-click-1",
      name: "Автокликер",
      description: "+1 монета в секунду",
      cost: 100,
      icon: "Zap",
      type: "autoclicker",
    },
    {
      id: "click-x5",
      name: "Мега клик",
      description: "x5 множитель к кликам",
      cost: 500,
      icon: "Star",
      type: "multiplier",
    },
    {
      id: "auto-click-5",
      name: "Турбо автокликер",
      description: "+5 монет в секунду",
      cost: 1000,
      icon: "Rocket",
      type: "autoclicker",
    },
  ];

  const canAfford = (cost: number) => coins >= cost;

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
        <Icon name="ShoppingCart" size={20} />
        Магазин улучшений
      </h3>

      <div className="space-y-3">
        {upgrades.map((upgrade) => (
          <div
            key={upgrade.id}
            className={`p-4 border rounded-lg transition-all ${
              canAfford(upgrade.cost)
                ? "border-green-200 bg-green-50 hover:bg-green-100"
                : "border-gray-200 bg-gray-50 opacity-60"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon
                  name={upgrade.icon as any}
                  size={20}
                  className="text-green-600"
                />
                <div>
                  <h4 className="font-semibold text-green-800">
                    {upgrade.name}
                  </h4>
                  <p className="text-sm text-green-600">
                    {upgrade.description}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-green-700">
                  {upgrade.cost} 🪙
                </div>
                <Button
                  onClick={() => onPurchase(upgrade)}
                  disabled={!canAfford(upgrade.cost)}
                  size="sm"
                  className={`mt-1 ${canAfford(upgrade.cost) ? "bg-green-600 hover:bg-green-700" : ""}`}
                >
                  Купить
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-green-100 rounded-lg">
        <div className="text-sm text-green-700">
          <div>Текущий множитель: x{clickMultiplier}</div>
          <div>Автокликер: +{autoClickerRate}/сек</div>
        </div>
      </div>
    </Card>
  );
}
