import { useMemo, useState } from "react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Activity,
  IndianRupee,
  Plane,
  Clock,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from "lucide-react";

/* =========================
   MOCK ANALYTICS DATA
========================= */

const fareTrendData = {
  "7D": [
    { day: "Mon", fare: 4280 },
    { day: "Tue", fare: 4120 },
    { day: "Wed", fare: 4190 },
    { day: "Thu", fare: 3970 },
    { day: "Fri", fare: 4050 },
    { day: "Sat", fare: 3890 },
    { day: "Sun", fare: 3980 },
  ],
  "30D": [
    { day: "W1", fare: 4520 },
    { day: "W2", fare: 4380 },
    { day: "W3", fare: 4160 },
    { day: "W4", fare: 3980 },
  ],
  "90D": [
    { day: "Jan", fare: 4850 },
    { day: "Feb", fare: 4720 },
    { day: "Mar", fare: 4510 },
    { day: "Apr", fare: 4380 },
    { day: "May", fare: 4210 },
    { day: "Jun", fare: 3980 },
  ],
};

const routeAnalytics = [
  {
    route: "DEL → BOM",
    flights: 342,
    avgFare: 4250,
    change: -8.2,
    volatility: "Low",
    demand: "High",
  },
  {
    route: "BOM → BLR",
    flights: 286,
    avgFare: 3890,
    change: 4.1,
    volatility: "Medium",
    demand: "High",
  },
  {
    route: "DEL → BLR",
    flights: 318,
    avgFare: 4620,
    change: -3.7,
    volatility: "Low",
    demand: "High",
  },
  {
    route: "DEL → HYD",
    flights: 241,
    avgFare: 3540,
    change: -6.4,
    volatility: "Low",
    demand: "Medium",
  },
  {
    route: "BLR → MAA",
    flights: 198,
    avgFare: 2890,
    change: -5.1,
    volatility: "Medium",
    demand: "Medium",
  },
  {
    route: "CCU → DEL",
    flights: 176,
    avgFare: 3970,
    change: 6.3,
    volatility: "High",
    demand: "Medium",
  },
];

const airlineAnalytics = [
  {
    airline: "IndiGo",
    code: "6E",
    avgFare: 3980,
    marketShare: 42.4,
    change: -4.8,
    flights: 1248,
  },
  {
    airline: "Air India",
    code: "AI",
    avgFare: 4620,
    marketShare: 28.1,
    change: 3.6,
    flights: 824,
  },
  {
    airline: "Akasa Air",
    code: "QP",
    avgFare: 3540,
    marketShare: 12.8,
    change: -6.2,
    flights: 376,
  },
  {
    airline: "SpiceJet",
    code: "SG",
    avgFare: 3270,
    marketShare: 10.2,
    change: 5.4,
    flights: 298,
  },
  {
    airline: "Vistara",
    code: "UK",
    avgFare: 5180,
    marketShare: 6.5,
    change: 1.9,
    flights: 194,
  },
];

/* =========================
   HELPERS
========================= */

const formatFare = (value) =>
  `₹${value.toLocaleString("en-IN")}`;

const getChangeClass = (change) => {
  if (change < 0) return "text-green-600";
  if (change > 0) return "text-red-500";
  return "text-gray-500";
};

const getChangeIcon = (change) => {
  if (change < 0) return <ArrowDownRight size={15} />;
  if (change > 0) return <ArrowUpRight size={15} />;
  return <Minus size={15} />;
};

const getVolatilityClass = (value) => {
  if (value === "Low") {
    return "bg-green-50 text-green-700";
  }

  if (value === "Medium") {
    return "bg-yellow-50 text-yellow-700";
  }

  return "bg-red-50 text-red-600";
};

const getDemandClass = (value) => {
  if (value === "High") {
    return "bg-blue-50 text-blue-700";
  }

  return "bg-gray-100 text-gray-600";
};

/* =========================
   COMPONENT
========================= */

function Analytics() {
  const [timeRange, setTimeRange] = useState("7D");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const trendData = fareTrendData[timeRange];

  const analytics = useMemo(() => {
    const fares = trendData.map((item) => item.fare);

    const average =
      fares.reduce((sum, fare) => sum + fare, 0) / fares.length;

    const highest = Math.max(...fares);
    const lowest = Math.min(...fares);

    const volatility =
      ((highest - lowest) / average) * 100;

    return {
      average: Math.round(average),
      highest,
      lowest,
      volatility: volatility.toFixed(1),
    };
  }, [trendData]);

  const handleRefresh = () => {
    setIsRefreshing(true);

    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const chartMax = Math.max(...trendData.map((item) => item.fare));
  const chartMin = Math.min(...trendData.map((item) => item.fare));

  return (
    <div className="space-y-6">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <BarChart3
                size={25}
                className="text-[#1565C0]"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-[#0B1F3A]">
                APIx Analytics
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Analyze airfare trends, pricing behavior and
                route performance across India.
              </p>
            </div>

          </div>

          <button
            onClick={handleRefresh}
            className="flex items-center justify-center gap-2 rounded-lg bg-[#0B1F3A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1565C0]"
          >
            <RefreshCw
              size={17}
              className={isRefreshing ? "animate-spin" : ""}
            />

            {isRefreshing ? "Refreshing..." : "Refresh Data"}
          </button>

        </div>

      </div>

      {/* =========================
          LIVE STATUS
      ========================= */}

      <div className="flex flex-col gap-3 rounded-xl border border-green-100 bg-green-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-3">

          <div className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
          </div>

          <div>
            <p className="text-sm font-semibold text-green-800">
              Analytics Engine Live
            </p>

            <p className="text-xs text-green-700">
              Processing real-time airfare data
            </p>
          </div>

        </div>

        <div className="flex items-center gap-2 text-xs text-green-700">
          <Clock size={14} />
          Last updated 2 minutes ago
        </div>

      </div>

      {/* =========================
          KPI CARDS
      ========================= */}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {/* Average Fare */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Average Fare
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[#0B1F3A]">
                {formatFare(analytics.average)}
              </h2>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
              <IndianRupee
                size={19}
                className="text-[#1565C0]"
              />
            </div>

          </div>

          <div className="mt-3 flex items-center gap-1 text-xs text-green-600">
            <TrendingDown size={14} />
            <span>4.8% lower than previous period</span>
          </div>

        </div>

        {/* Volatility */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Fare Volatility
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[#0B1F3A]">
                {analytics.volatility}%
              </h2>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50">
              <Activity
                size={19}
                className="text-purple-600"
              />
            </div>

          </div>

          <div className="mt-3 flex items-center gap-1 text-xs text-gray-500">
            <span>Price fluctuation range</span>
          </div>

        </div>

        {/* Price Drops */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Price Drops
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[#0B1F3A]">
                64
              </h2>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
              <TrendingDown
                size={19}
                className="text-green-600"
              />
            </div>

          </div>

          <div className="mt-3 text-xs text-green-600">
            18% more than previous period
          </div>

        </div>

        {/* Routes Analyzed */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Routes Analyzed
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[#0B1F3A]">
                186
              </h2>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50">
              <Plane
                size={19}
                className="text-orange-500"
              />
            </div>

          </div>

          <div className="mt-3 text-xs text-gray-500">
            Across 5 major airlines
          </div>

        </div>

      </div>

      {/* =========================
          FARE TREND
      ========================= */}

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-lg font-bold text-[#0B1F3A]">
              Average Fare Trend
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Average airfare movement over the selected period
            </p>
          </div>

          <div className="flex rounded-lg bg-gray-100 p-1">

            {["7D", "30D", "90D"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`rounded-md px-4 py-2 text-xs font-semibold transition ${
                  timeRange === range
                    ? "bg-white text-[#1565C0] shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {range}
              </button>
            ))}

          </div>

        </div>

        {/* Chart */}
        <div className="mt-8">

          <div className="relative h-72">

            {/* Horizontal guides */}
            <div className="absolute inset-0 flex flex-col justify-between">

              {[0, 1, 2, 3, 4].map((line) => (
                <div
                  key={line}
                  className="border-t border-dashed border-gray-100"
                />
              ))}

            </div>

            {/* SVG Chart */}
            <svg
              viewBox="0 0 800 280"
              className="relative z-10 h-full w-full overflow-visible"
              preserveAspectRatio="none"
            >

              {/* Area */}
              <polygon
                points={trendData
                  .map((item, index) => {
                    const x =
                      (index / (trendData.length - 1)) * 760 + 20;

                    const y =
                      240 -
                      ((item.fare - chartMin) /
                        (chartMax - chartMin || 1)) *
                        190;

                    return `${x},${y}`;
                  })
                  .join(" ") +
                  " 780,260 20,260"
                }
                fill="rgba(21, 101, 192, 0.08)"
              />

              {/* Line */}
              <polyline
                points={trendData
                  .map((item, index) => {
                    const x =
                      (index / (trendData.length - 1)) * 760 + 20;

                    const y =
                      240 -
                      ((item.fare - chartMin) /
                        (chartMax - chartMin || 1)) *
                        190;

                    return `${x},${y}`;
                  })
                  .join(" ")}
                fill="none"
                stroke="#1565C0"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Points */}
              {trendData.map((item, index) => {
                const x =
                  (index / (trendData.length - 1)) * 760 + 20;

                const y =
                  240 -
                  ((item.fare - chartMin) /
                    (chartMax - chartMin || 1)) *
                    190;

                return (
                  <g key={item.day}>
                    <circle
                      cx={x}
                      cy={y}
                      r="6"
                      fill="white"
                      stroke="#1565C0"
                      strokeWidth="3"
                    />

                    <text
                      x={x}
                      y={y - 14}
                      textAnchor="middle"
                      fontSize="12"
                      fontWeight="600"
                      fill="#0B1F3A"
                    >
                      ₹{item.fare}
                    </text>
                  </g>
                );
              })}

            </svg>

          </div>

          {/* X Axis */}
          <div className="mt-2 flex justify-between px-2">

            {trendData.map((item) => (
              <span
                key={item.day}
                className="text-xs font-medium text-gray-400"
              >
                {item.day}
              </span>
            ))}

          </div>

        </div>

      </div>

      {/* =========================
          ROUTE PERFORMANCE
      ========================= */}

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">

        <div className="border-b border-gray-100 p-6">

          <div>
            <h2 className="text-lg font-bold text-[#0B1F3A]">
              Route Performance
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Pricing behavior across monitored routes
            </p>
          </div>

        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto md:block">

          <table className="w-full">

            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/70">

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Route
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Flights
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Avg Fare
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Change
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Volatility
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Demand
                </th>

              </tr>
            </thead>

            <tbody>

              {routeAnalytics.map((route) => (
                <tr
                  key={route.route}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50/70"
                >

                  <td className="px-6 py-4">

                    <span className="font-semibold text-[#0B1F3A]">
                      {route.route}
                    </span>

                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {route.flights}
                  </td>

                  <td className="px-6 py-4 text-sm font-semibold text-[#0B1F3A]">
                    {formatFare(route.avgFare)}
                  </td>

                  <td className={`px-6 py-4 ${getChangeClass(route.change)}`}>

                    <div className="flex items-center gap-1 text-sm font-semibold">
                      {getChangeIcon(route.change)}
                      {Math.abs(route.change)}%
                    </div>

                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getVolatilityClass(
                        route.volatility
                      )}`}
                    >
                      {route.volatility}
                    </span>

                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getDemandClass(
                        route.demand
                      )}`}
                    >
                      {route.demand}
                    </span>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

        {/* Mobile Cards */}
        <div className="space-y-3 p-4 md:hidden">

          {routeAnalytics.map((route) => (
            <div
              key={route.route}
              className="rounded-xl border border-gray-100 p-4"
            >

              <div className="flex items-center justify-between">

                <span className="font-bold text-[#0B1F3A]">
                  {route.route}
                </span>

                <span
                  className={`flex items-center gap-1 text-sm font-semibold ${getChangeClass(
                    route.change
                  )}`}
                >
                  {getChangeIcon(route.change)}
                  {Math.abs(route.change)}%
                </span>

              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">

                <div>
                  <p className="text-xs text-gray-400">
                    Average Fare
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#0B1F3A]">
                    {formatFare(route.avgFare)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Flights
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#0B1F3A]">
                    {route.flights}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Volatility
                  </p>
                  <span
                    className={`mt-1 inline-block rounded-full px-2 py-1 text-[10px] font-semibold ${getVolatilityClass(
                      route.volatility
                    )}`}
                  >
                    {route.volatility}
                  </span>
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Demand
                  </p>
                  <span
                    className={`mt-1 inline-block rounded-full px-2 py-1 text-[10px] font-semibold ${getDemandClass(
                      route.demand
                    )}`}
                  >
                    {route.demand}
                  </span>
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* =========================
          AIRLINE ANALYTICS
      ========================= */}

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">

        <div className="border-b border-gray-100 p-6">

          <h2 className="text-lg font-bold text-[#0B1F3A]">
            Airline Fare Comparison
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Compare average pricing and market share
          </p>

        </div>

        <div className="grid grid-cols-1 gap-4 p-6 lg:grid-cols-2">

          {airlineAnalytics.map((airline) => (
            <div
              key={airline.code}
              className="rounded-xl border border-gray-100 p-5 transition hover:border-blue-100 hover:shadow-sm"
            >

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0B1F3A] text-xs font-bold text-white">
                    {airline.code}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#0B1F3A]">
                      {airline.airline}
                    </h3>

                    <p className="text-xs text-gray-400">
                      {airline.flights} flights tracked
                    </p>
                  </div>

                </div>

                <div
                  className={`flex items-center gap-1 text-sm font-semibold ${getChangeClass(
                    airline.change
                  )}`}
                >
                  {getChangeIcon(airline.change)}
                  {Math.abs(airline.change)}%
                </div>

              </div>

              <div className="mt-5">

                <div className="flex items-end justify-between">

                  <div>
                    <p className="text-xs text-gray-400">
                      Average Fare
                    </p>

                    <p className="mt-1 text-xl font-bold text-[#0B1F3A]">
                      {formatFare(airline.avgFare)}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-400">
                      Market Share
                    </p>

                    <p className="mt-1 text-sm font-bold text-[#1565C0]">
                      {airline.marketShare}%
                    </p>
                  </div>

                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">

                  <div
                    className="h-full rounded-full bg-[#1565C0]"
                    style={{
                      width: `${airline.marketShare}%`,
                    }}
                  />

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* =========================
          INSIGHTS
      ========================= */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        <div className="rounded-xl border border-green-100 bg-green-50 p-5">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
              <TrendingDown
                size={19}
                className="text-green-600"
              />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
                Best Opportunity
              </p>

              <h3 className="mt-1 font-bold text-green-900">
                DEL → BOM
              </h3>
            </div>

          </div>

          <p className="mt-4 text-sm leading-6 text-green-800">
            Fares have dropped 8.2%, making this one of the
            strongest current booking opportunities.
          </p>

        </div>

        <div className="rounded-xl border border-red-100 bg-red-50 p-5">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
              <TrendingUp
                size={19}
                className="text-red-500"
              />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
                Price Warning
              </p>

              <h3 className="mt-1 font-bold text-red-900">
                CCU → DEL
              </h3>
            </div>

          </div>

          <p className="mt-4 text-sm leading-6 text-red-800">
            Average fares increased by 6.3%. Monitor this route
            for potential price corrections.
          </p>

        </div>

        <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
              <BarChart3
                size={19}
                className="text-[#1565C0]"
              />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                Market Insight
              </p>

              <h3 className="mt-1 font-bold text-blue-900">
                IndiGo Leading
              </h3>
            </div>

          </div>

          <p className="mt-4 text-sm leading-6 text-blue-800">
            IndiGo currently represents 42.4% of tracked flight
            activity and maintains competitive pricing.
          </p>

        </div>

      </div>

      {/* =========================
          FOOTER
      ========================= */}

      <div className="flex flex-col gap-2 border-t border-gray-200 pt-4 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">

        <span>
          SKY SCRAPPER Analytics Engine
        </span>

        <span>
          Real-time airfare intelligence
        </span>

      </div>

    </div>
  );
}

export default Analytics;