import {
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  ArrowRight,
} from "lucide-react";

function AlertCard() {
  const alerts = [
    {
      type: "Fare Spike",
      route: "Delhi → Mumbai",
      message: "Average fare increased by 18%",
      time: "12 min ago",
      icon: TrendingUp,
      level: "high",
    },
    {
      type: "Price Drop",
      route: "Bengaluru → Delhi",
      message: "Fare dropped by 12%",
      time: "28 min ago",
      icon: TrendingDown,
      level: "low",
    },
    {
      type: "Unusual Activity",
      route: "Mumbai → Bengaluru",
      message: "Prices are changing unusually fast",
      time: "45 min ago",
      icon: AlertTriangle,
      level: "medium",
    },
  ];

  return (
    <div className="mt-6 rounded-2xl bg-white border border-gray-100 p-6 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-semibold text-[#0B1F3A]">
            Smart Alerts
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Important airfare movements requiring attention
          </p>
        </div>

        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
          View all
        </button>
      </div>

      {/* Alerts */}
      <div className="space-y-3">
        {alerts.map((alert, index) => {
          const Icon = alert.icon;

          return (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-xl
                         bg-gray-50 hover:bg-gray-100 transition"
            >

              {/* Left */}
              <div className="flex items-center gap-4">

                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    alert.level === "high"
                      ? "bg-red-100 text-red-600"
                      : alert.level === "medium"
                      ? "bg-orange-100 text-orange-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  <Icon size={20} />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-800">
                      {alert.type}
                    </p>

                    <span className="text-xs text-gray-400">
                      {alert.time}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mt-1">
                    {alert.route}
                  </p>

                  <p className="text-sm text-gray-500">
                    {alert.message}
                  </p>
                </div>

              </div>

              {/* Arrow */}
              <button className="p-2 rounded-lg hover:bg-white transition">
                <ArrowRight
                  size={18}
                  className="text-gray-400"
                />
              </button>

            </div>
          );
        })}
      </div>

    </div>
  );
}

export default AlertCard;