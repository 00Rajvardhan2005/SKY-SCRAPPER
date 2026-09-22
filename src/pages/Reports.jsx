import { useMemo, useState } from "react";
import {
  FileText,
  Download,
  RefreshCw,
  CalendarDays,
  TrendingUp,
  TrendingDown,
  IndianRupee,
  Plane,
  BarChart3,
  Clock,
  CheckCircle2,
  FileBarChart,
  Search,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

/* =========================================================
   MOCK DATA
========================================================= */

const fareTrendData = {
  "7 Days": [
    { day: "Mon", fare: 4120 },
    { day: "Tue", fare: 4050 },
    { day: "Wed", fare: 3980 },
    { day: "Thu", fare: 4210 },
    { day: "Fri", fare: 4160 },
    { day: "Sat", fare: 3890 },
    { day: "Sun", fare: 3980 },
  ],

  "30 Days": [
    { day: "Week 1", fare: 4280 },
    { day: "Week 2", fare: 4150 },
    { day: "Week 3", fare: 4020 },
    { day: "Week 4", fare: 3980 },
  ],

  "90 Days": [
    { day: "Jan", fare: 4520 },
    { day: "Feb", fare: 4380 },
    { day: "Mar", fare: 4210 },
    { day: "Apr", fare: 4050 },
    { day: "May", fare: 3980 },
    { day: "Jun", fare: 4120 },
  ],
};

const routeReports = [
  {
    route: "DEL → BOM",
    airline: "IndiGo",
    flights: 42,
    averageFare: 4250,
    change: -8.2,
    status: "Improving",
  },
  {
    route: "BOM → BLR",
    airline: "Air India",
    flights: 31,
    averageFare: 3890,
    change: 4.1,
    status: "Rising",
  },
  {
    route: "DEL → BLR",
    airline: "IndiGo",
    flights: 38,
    averageFare: 4620,
    change: -3.7,
    status: "Improving",
  },
  {
    route: "DEL → HYD",
    airline: "Akasa Air",
    flights: 24,
    averageFare: 3540,
    change: -6.4,
    status: "Improving",
  },
  {
    route: "CCU → DEL",
    airline: "Air India",
    flights: 21,
    averageFare: 3970,
    change: 6.3,
    status: "Rising",
  },
  {
    route: "BLR → MAA",
    airline: "IndiGo",
    flights: 26,
    averageFare: 2890,
    change: -5.1,
    status: "Improving",
  },
];

const airlineReports = [
  {
    name: "IndiGo",
    code: "6E",
    flights: 1248,
    averageFare: 3980,
    change: -4.8,
    marketShare: 42.4,
    onTime: 86,
  },
  {
    name: "Air India",
    code: "AI",
    flights: 824,
    averageFare: 4620,
    change: 3.6,
    marketShare: 28.1,
    onTime: 81,
  },
  {
    name: "Akasa Air",
    code: "QP",
    flights: 376,
    averageFare: 3540,
    change: -6.2,
    marketShare: 12.8,
    onTime: 89,
  },
  {
    name: "SpiceJet",
    code: "SG",
    flights: 298,
    averageFare: 3270,
    change: 5.4,
    marketShare: 10.2,
    onTime: 77,
  },
];

const recentReports = [
  {
    name: "Weekly Fare Intelligence Report",
    type: "Fare Analysis",
    date: "Today, 09:30 AM",
    size: "2.4 MB",
  },
  {
    name: "India Domestic Route Report",
    type: "Route Analysis",
    date: "Yesterday, 04:15 PM",
    size: "3.1 MB",
  },
  {
    name: "Airline Performance Report",
    type: "Airline Analysis",
    date: "18 Sep 2026",
    size: "1.8 MB",
  },
];

/* =========================================================
   HELPERS
========================================================= */

function formatFare(value) {
  return `₹${value.toLocaleString("en-IN")}`;
}

function getChangeClass(change) {
  if (change < 0) {
    return "text-green-600 bg-green-50";
  }

  if (change > 0) {
    return "text-red-600 bg-red-50";
  }

  return "text-gray-500 bg-gray-100";
}

function getChangeIcon(change) {
  if (change < 0) {
    return <TrendingDown size={14} />;
  }

  if (change > 0) {
    return <TrendingUp size={14} />;
  }

  return null;
}

/* =========================================================
   COMPONENT
========================================================= */

function Reports() {
  const [dateRange, setDateRange] = useState("7 Days");
  const [reportType, setReportType] = useState("Fare Analysis");
  const [search, setSearch] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGenerated, setLastGenerated] = useState("Today, 09:30 AM");

  const trendData = fareTrendData[dateRange];

  const filteredRoutes = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return routeReports;
    }

    return routeReports.filter(
      (route) =>
        route.route.toLowerCase().includes(query) ||
        route.airline.toLowerCase().includes(query)
    );
  }, [search]);

  const averageFare = Math.round(
    trendData.reduce((sum, item) => sum + item.fare, 0) / trendData.length
  );

  const firstFare = trendData[0].fare;
  const lastFare = trendData[trendData.length - 1].fare;

  const overallChange = Number(
    (((lastFare - firstFare) / firstFare) * 100).toFixed(1)
  );

  const priceDrops = routeReports.filter(
    (route) => route.change < 0
  ).length;

  const totalFlights = airlineReports.reduce(
    (sum, airline) => sum + airline.flights,
    0
  );

  const generateReport = () => {
    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);

      const now = new Date();

      setLastGenerated(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 1200);
  };

  /* =========================================================
     SVG CHART
  ========================================================= */

  const chartWidth = 900;
  const chartHeight = 280;

  const chartValues = trendData.map((item) => item.fare);

  const minValue = Math.min(...chartValues) - 100;
  const maxValue = Math.max(...chartValues) + 100;

  const points = trendData
    .map((item, index) => {
      const x =
        50 +
        (index / Math.max(trendData.length - 1, 1)) *
          (chartWidth - 100);

      const y =
        chartHeight -
        35 -
        ((item.fare - minValue) / (maxValue - minValue)) *
          (chartHeight - 70);

      return {
        x,
        y,
        fare: item.fare,
        label: item.day,
      };
    });

  const linePoints = points.map((point) => `${point.x},${point.y}`).join(" ");

  return (
    <div className="space-y-6">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#1565C0]">
              <FileBarChart size={24} />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#0B1F3A] sm:text-3xl">
                Reports & Insights
              </h2>

              <p className="mt-1 text-sm text-gray-500 sm:text-base">
                Generate detailed airfare intelligence reports
                for routes, airlines and market trends.
              </p>
            </div>

          </div>

          <button
            onClick={generateReport}
            disabled={isGenerating}
            className="flex h-11 items-center justify-center gap-2 rounded-lg bg-[#1565C0] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Download
              size={18}
              className={isGenerating ? "animate-bounce" : ""}
            />

            {isGenerating ? "Generating..." : "Generate Report"}
          </button>

        </div>
      </div>

      {/* =====================================================
          FILTERS
      ===================================================== */}

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

        <div className="mb-4 flex items-center gap-2">
          <CalendarDays size={18} className="text-[#1565C0]" />

          <h3 className="font-semibold text-[#0B1F3A]">
            Report Configuration
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          {/* DATE RANGE */}

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
              Date Range
            </label>

            <div className="flex rounded-lg bg-gray-100 p-1">

              {["7 Days", "30 Days", "90 Days"].map((range) => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`flex-1 rounded-md px-3 py-2 text-xs font-semibold transition ${
                    dateRange === range
                      ? "bg-white text-[#1565C0] shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {range}
                </button>
              ))}

            </div>
          </div>

          {/* REPORT TYPE */}

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
              Report Type
            </label>

            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-blue-500"
            >
              <option>Fare Analysis</option>
              <option>Route Analysis</option>
              <option>Airline Analysis</option>
              <option>Market Overview</option>
            </select>
          </div>

          {/* SEARCH */}

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
              Search Routes
            </label>

            <div className="relative">

              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search route or airline..."
                className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
              />

            </div>
          </div>

        </div>
      </div>

      {/* =====================================================
          KPI CARDS
      ===================================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* AVG FARE */}

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-medium text-gray-500">
                Average Fare
              </p>

              <h3 className="mt-2 text-2xl font-bold text-[#0B1F3A]">
                {formatFare(averageFare)}
              </h3>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-[#1565C0]">
              <IndianRupee size={20} />
            </div>

          </div>

          <div className="mt-3 flex items-center gap-1 text-xs text-gray-500">
            <Clock size={13} />
            Based on {dateRange}
          </div>

        </div>

        {/* FARE CHANGE */}

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-medium text-gray-500">
                Fare Change
              </p>

              <h3
                className={`mt-2 text-2xl font-bold ${
                  overallChange < 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {overallChange > 0 ? "+" : ""}
                {overallChange}%
              </h3>
            </div>

            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                overallChange < 0
                  ? "bg-green-50 text-green-600"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {overallChange < 0 ? (
                <ArrowDownRight size={21} />
              ) : (
                <ArrowUpRight size={21} />
              )}
            </div>

          </div>

          <p className="mt-3 text-xs text-gray-500">
            Compared with start of period
          </p>

        </div>

        {/* ROUTES */}

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-medium text-gray-500">
                Routes Analyzed
              </p>

              <h3 className="mt-2 text-2xl font-bold text-[#0B1F3A]">
                {routeReports.length}
              </h3>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
              <Plane size={20} />
            </div>

          </div>

          <p className="mt-3 text-xs text-gray-500">
            Across major Indian routes
          </p>

        </div>

        {/* PRICE DROPS */}

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-medium text-gray-500">
                Price Drops
              </p>

              <h3 className="mt-2 text-2xl font-bold text-green-600">
                {priceDrops}
              </h3>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
              <TrendingDown size={20} />
            </div>

          </div>

          <p className="mt-3 text-xs text-gray-500">
            Routes showing lower fares
          </p>

        </div>

      </div>

      {/* =====================================================
          FARE TREND
      ===================================================== */}

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <div className="flex items-center gap-2">
              <BarChart3 size={19} className="text-[#1565C0]" />

              <h3 className="font-bold text-[#0B1F3A]">
                Fare Trend
              </h3>
            </div>

            <p className="mt-1 text-xs text-gray-500">
              Average domestic airfare during the selected period
            </p>

          </div>

          <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-500">
            <ActivityIcon />
            Live market data
          </div>

        </div>

        <div className="mt-6 overflow-x-auto">

          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="h-[280px] min-w-[700px] w-full"
          >

            {/* GRID */}

            {[0, 1, 2, 3, 4].map((line) => {
              const y =
                30 + line * ((chartHeight - 70) / 4);

              return (
                <line
                  key={line}
                  x1="50"
                  y1={y}
                  x2={chartWidth - 50}
                  y2={y}
                  stroke="#E5E7EB"
                  strokeWidth="1"
                />
              );
            })}

            {/* AREA */}

            <polygon
              points={`50,${chartHeight - 35} ${linePoints} ${
                chartWidth - 50
              },${chartHeight - 35}`}
              fill="#1565C0"
              opacity="0.07"
            />

            {/* LINE */}

            <polyline
              points={linePoints}
              fill="none"
              stroke="#1565C0"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* POINTS */}

            {points.map((point) => (
              <g key={`${point.label}-${point.fare}`}>

                <circle
                  cx={point.x}
                  cy={point.y}
                  r="6"
                  fill="white"
                  stroke="#1565C0"
                  strokeWidth="3"
                />

                <text
                  x={point.x}
                  y={point.y - 14}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#475569"
                  fontWeight="600"
                >
                  ₹{point.fare}
                </text>

                <text
                  x={point.x}
                  y={chartHeight - 10}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#94A3B8"
                >
                  {point.label}
                </text>

              </g>
            ))}

          </svg>

        </div>

      </div>

      {/* =====================================================
          ROUTE PERFORMANCE
      ===================================================== */}

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">

        <div className="border-b border-gray-100 p-5 sm:p-6">

          <div className="flex items-center justify-between">

            <div>

              <h3 className="font-bold text-[#0B1F3A]">
                Route Performance
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                Fare movement across monitored routes
              </p>

            </div>

            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#1565C0]">
              {filteredRoutes.length} routes
            </span>

          </div>

        </div>

        {/* DESKTOP TABLE */}

        <div className="hidden overflow-x-auto md:block">

          <table className="w-full text-left">

            <thead className="bg-gray-50">

              <tr className="text-[11px] uppercase tracking-wide text-gray-500">

                <th className="px-6 py-4 font-semibold">
                  Route
                </th>

                <th className="px-6 py-4 font-semibold">
                  Airline
                </th>

                <th className="px-6 py-4 font-semibold">
                  Flights
                </th>

                <th className="px-6 py-4 font-semibold">
                  Avg Fare
                </th>

                <th className="px-6 py-4 font-semibold">
                  Change
                </th>

                <th className="px-6 py-4 font-semibold">
                  Status
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-gray-100">

              {filteredRoutes.map((route) => (
                <tr
                  key={route.route}
                  className="transition hover:bg-gray-50"
                >

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-2">

                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#1565C0]">
                        <Plane size={15} />
                      </div>

                      <span className="font-semibold text-[#0B1F3A]">
                        {route.route}
                      </span>

                    </div>

                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {route.airline}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-gray-700">
                    {route.flights}
                  </td>

                  <td className="px-6 py-4 text-sm font-bold text-[#0B1F3A]">
                    {formatFare(route.averageFare)}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${getChangeClass(
                        route.change
                      )}`}
                    >
                      {getChangeIcon(route.change)}

                      {route.change > 0 ? "+" : ""}
                      {route.change}%
                    </span>

                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        route.change < 0
                          ? "bg-green-50 text-green-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {route.status}
                    </span>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

        {/* MOBILE */}

        <div className="divide-y divide-gray-100 md:hidden">

          {filteredRoutes.map((route) => (
            <div
              key={route.route}
              className="p-4"
            >

              <div className="flex items-start justify-between">

                <div>

                  <p className="font-bold text-[#0B1F3A]">
                    {route.route}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {route.airline} · {route.flights} flights
                  </p>

                </div>

                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${getChangeClass(
                    route.change
                  )}`}
                >
                  {getChangeIcon(route.change)}
                  {route.change > 0 ? "+" : ""}
                  {route.change}%
                </span>

              </div>

              <div className="mt-3 flex items-center justify-between">

                <span className="text-sm font-bold text-[#0B1F3A]">
                  {formatFare(route.averageFare)}
                </span>

                <span className="text-xs text-gray-500">
                  {route.status}
                </span>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* =====================================================
          AIRLINE PERFORMANCE
      ===================================================== */}

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">

        <div className="border-b border-gray-100 p-5 sm:p-6">

          <h3 className="font-bold text-[#0B1F3A]">
            Airline Performance
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            Key performance indicators across monitored airlines
          </p>

        </div>

        <div className="grid grid-cols-1 divide-y divide-gray-100 lg:grid-cols-2 lg:divide-x lg:divide-y-0">

          {airlineReports.map((airline) => (
            <div
              key={airline.code}
              className="p-5 transition hover:bg-gray-50"
            >

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0B1F3A] text-xs font-bold text-white">
                    {airline.code}
                  </div>

                  <div>

                    <h4 className="text-sm font-bold text-[#0B1F3A]">
                      {airline.name}
                    </h4>

                    <p className="text-xs text-gray-500">
                      {airline.flights.toLocaleString()} flights
                    </p>

                  </div>

                </div>

                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${getChangeClass(
                    airline.change
                  )}`}
                >
                  {getChangeIcon(airline.change)}

                  {airline.change > 0 ? "+" : ""}
                  {airline.change}%
                </span>

              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">

                <div>
                  <p className="text-[10px] uppercase tracking-wide text-gray-400">
                    Avg Fare
                  </p>

                  <p className="mt-1 text-sm font-bold text-[#0B1F3A]">
                    {formatFare(airline.averageFare)}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-wide text-gray-400">
                    Market Share
                  </p>

                  <p className="mt-1 text-sm font-bold text-[#0B1F3A]">
                    {airline.marketShare}%
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-wide text-gray-400">
                    On-Time
                  </p>

                  <p className="mt-1 text-sm font-bold text-green-600">
                    {airline.onTime}%
                  </p>
                </div>

              </div>

              {/* MARKET SHARE BAR */}

              <div className="mt-4">

                <div className="mb-1 flex items-center justify-between">

                  <span className="text-[10px] text-gray-400">
                    Market share
                  </span>

                  <span className="text-[10px] font-semibold text-gray-500">
                    {airline.marketShare}%
                  </span>

                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">

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

      {/* =====================================================
          RECENT REPORTS
      ===================================================== */}

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">

        <div className="flex flex-col gap-3 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">

          <div>

            <h3 className="font-bold text-[#0B1F3A]">
              Recent Reports
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Previously generated reports
            </p>

          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">

            <CheckCircle2
              size={15}
              className="text-green-500"
            />

            Last generated: {lastGenerated}

          </div>

        </div>

        <div className="divide-y divide-gray-100">

          {recentReports.map((report) => (
            <div
              key={report.name}
              className="flex flex-col gap-4 p-5 transition hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between"
            >

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#1565C0]">
                  <FileText size={18} />
                </div>

                <div>

                  <h4 className="text-sm font-semibold text-[#0B1F3A]">
                    {report.name}
                  </h4>

                  <p className="mt-1 text-xs text-gray-500">
                    {report.type} · {report.date} · {report.size}
                  </p>

                </div>

              </div>

              <button
                className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#1565C0]"
              >
                <Download size={15} />
                Download
              </button>

            </div>
          ))}

        </div>

      </div>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div className="flex flex-col gap-2 border-t border-gray-200 pt-4 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">

        <span>
          Reports generated from SKY SCRAPPER airfare monitoring data.
        </span>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          Data collection active
        </div>

      </div>

    </div>
  );
}

/* =========================================================
   SMALL ICON
========================================================= */

function ActivityIcon() {
  return (
    <RefreshCw
      size={14}
      className="text-green-500"
    />
  );
}

export default Reports;