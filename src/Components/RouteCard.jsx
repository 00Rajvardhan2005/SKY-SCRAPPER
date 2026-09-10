import {
  Plane,
  TrendingUp,
  TrendingDown,
  ArrowRight,
} from "lucide-react";

function RouteCard() {
  const routes = [
    {
      route: "Delhi → Mumbai",
      code: "DEL → BOM",
      fare: "₹7,240",
      change: "+18.4%",
      type: "up",
    },
    {
      route: "Mumbai → Bengaluru",
      code: "BOM → BLR",
      fare: "₹5,680",
      change: "+11.2%",
      type: "up",
    },
    {
      route: "Delhi → Bengaluru",
      code: "DEL → BLR",
      fare: "₹6,420",
      change: "-8.6%",
      type: "down",
    },
    {
      route: "Hyderabad → Mumbai",
      code: "HYD → BOM",
      fare: "₹4,950",
      change: "-6.3%",
      type: "down",
    },
  ];

  return (
    <div className="mt-6 rounded-2xl bg-white border border-gray-100 p-6 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-semibold text-[#0B1F3A]">
            Top Route Movements
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Routes with significant airfare changes
          </p>
        </div>

        <button className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700">
          View routes
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Routes */}
      <div className="space-y-3">
        {routes.map((route, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 rounded-xl
                       bg-gray-50 hover:bg-gray-100 transition"
          >

            {/* Route information */}
            <div className="flex items-center gap-4">

              <div className="w-10 h-10 rounded-lg bg-blue-50
                              flex items-center justify-center">
                <Plane
                  size={19}
                  className="text-blue-600"
                />
              </div>

              <div>
                <p className="font-semibold text-gray-800">
                  {route.route}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {route.code}
                </p>
              </div>

            </div>

            {/* Fare */}
            <div className="text-right">
              <p className="font-semibold text-[#0B1F3A]">
                {route.fare}
              </p>

              <div
                className={`flex items-center justify-end gap-1 mt-1 text-sm font-medium ${
                  route.type === "up"
                    ? "text-red-500"
                    : "text-green-600"
                }`}
              >
                {route.type === "up" ? (
                  <TrendingUp size={15} />
                ) : (
                  <TrendingDown size={15} />
                )}

                {route.change}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default RouteCard;