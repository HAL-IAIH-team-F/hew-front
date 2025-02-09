import React from "react";

const PurchaseHistoryCard = () => {
  // 仮の購入履歴データ
  const purchaseHistory = [
    { id: 1, item: "ゲーミングマウス", price: "¥7,980", date: "2025/02/01" },
    { id: 2, item: "メカニカルキーボード", price: "¥12,500", date: "2025/01/20" },
    { id: 3, item: "27インチ モニター", price: "¥35,000", date: "2025/01/10" },
  ];

  return (
    <div className="p-6 text-gray-100">
      <h2 className="text-xl font-bold mb-4">購入履歴</h2>
      {purchaseHistory.length > 0 ? (
        <ul className="space-y-2">
          {purchaseHistory.map((purchase) => (
            <li key={purchase.id} className="p-4 bg-gray-700 rounded-lg shadow">
              <p className="text-lg font-semibold">{purchase.item}</p>
              <p className="text-sm text-gray-400">{purchase.date}</p>
              <p className="text-md text-green-300">{purchase.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">購入履歴がありません。</p>
      )}
    </div>
  );
};

export default PurchaseHistoryCard;
