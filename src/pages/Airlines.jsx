
import { useMemo, useState } from "react";
import {
  Search,
  RefreshCw,
  Building2,
  Plane,
  TrendingUp,
  TrendingDown,
  Minus,
  IndianRupee,
  BarChart3,
  Activity,
  Clock,
} from "lucide-react";

const airlinesData = [
  {
    id: 1,
    name: "IndiGo",
    code: "6E",
    flights: 1248,
    marketShare: 42.4,
    averageFare: 3980,
    change: -4.8,
    onTime: 86,
    routes: 86,
    status: "Leading",
  },
  {
    id: 2,
    name: "Air India",
    code: "AI",
    flights: 824,
    marketShare: 28.1,
    averageFare: 4620,
    change: 3.6,
    onTime: 81,
    routes: 64,
    status: "Growing",
  },
  {
    id: 3,
    name: "Akasa Air",
    code: "QP",
    flights: 376,
    marketShare: 12.8,
    averageFare: 3540,
    change: -6.2,
    onTime: 89,
    routes: 38,
    status: "Competitive",
  },
  {
    id: 4,
    name: "SpiceJet",
    code: "SG",
    flights: 298,
    marketShare: 10.2,
    averageFare: 3270,
    change: 5.4,
    onTime: 77,
    routes: 31,
    status: "Stable",
  },
  {
    id: 5,
    name: "Vistara",
    code: "UK",
    flights: 194,
    marketShare: 6.5,
    averageFare: 5180,
    change: 1.9,
    onTime: 88,
    routes: 24,
    status: "Premium",
  },
];

function Airlines() {
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const filteredAirlines = useMemo(() => {
    const searchTerm = search.toLowerCase();

    return airlinesData.filter(
      (airline) =>
        airline.name.toLowerCase().includes(searchTerm) ||
        airline.code.toLowerCase().includes(searchTerm)
    );
  }, [search]);

  const totalFlights = airlinesData.reduce(
    (sum, airline) => sum + airline.flights,
    0
  );

  const averageFare =
    airlinesData.reduce(
      (sum, airline) => sum + airline.averageFare,
      0
    ) / airlinesData.length;

  const averageOnTime =
    airlinesData.reduce(
      (sum, airline) => sum + airline.onTime,
      0
    ) / airlinesData.length;

  const leadingAirline = airlinesData.reduce((leader, airline) =>
    airline.marketShare > leader.marketShare ? airline : leader
  );

  const handleRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const formatFare = (fare) => {
    return `₹${fare.toLocaleString("en-IN")}`;
  };

  const getChangeIcon = (change) => {
    if (change > 0) {
      return <TrendingUp size={15} />;
    }

    if (change < 0) {
      return <TrendingDown size={15} />;
    }

    return <Minus size={15} />;
  };

  const getChangeClass = (change) => {
    if (change > 0) {
      return "bg-red-50 text-red-600";
    }

    if (change < 0) {
      return "bg-green-50 text-green-600";
    }

    return "bg-gray-50 text-gray-500";
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Leading":
        return "bg-blue-50 text-blue-700";

      case "Growing":
        return "bg-green-50 text-green-700";

      case "Competitive":
        return "bg-purple-50 text-purple-700";

      case "Premium":
        return "bg-amber-50 text-amber-700";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#1565C0]">
              <Building2 size={24} />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#0B1F3A]">
                AirLines
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Compare airline pricing, market share and operational performance
              </p>
            </div>

          </div>

          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center justify-center gap-2 rounded-lg bg-[#0B1F3A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#12345c] disabled:cursor-not-allowed disabled:opacity-70"
          >
            <RefreshCw
              size={17}
              className={refreshing ? "animate-spin" : ""}
            />

            {refreshing ? "Refreshing..." : "Refresh Data"}
          </button>

        </div>

      </div>

      {/* Live Status */}
      <div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-3">

          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
          </span>

          <div>
            <p className="text-sm font-semibold text-gray-800">
              Airline monitoring is active
            </p>

            <p className="text-xs text-gray-500">
              Pricing and operational data are updated continuously
            </p>
          </div>

        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock size={14} />
          Live data
        </div>

      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {/* Airlines */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-gray-500">
                Airlines Tracked
              </p>

              <p className="mt-2 text-3xl font-bold text-[#0B1F3A]">
                {airlinesData.length}
              </p>

              <p className="mt-2 text-xs text-gray-400">
                Active carriers
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#1565C0]">
              <Building2 size={21} />
            </div>

          </div>

        </div>

        {/* Flights */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-gray-500">
                Flights Tracked
              </p>

              <p className="mt-2 text-3xl font-bold text-[#0B1F3A]">
                {totalFlights.toLocaleString("en-IN")}
              </p>

              <p className="mt-2 text-xs text-gray-400">
                Across all airlines
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <Plane size={21} />
            </div>

          </div>

        </div>

        {/* Average Fare */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-gray-500">
                Average Fare
              </p>

              <p className="mt-2 text-3xl font-bold text-[#0B1F3A]">
                {formatFare(Math.round(averageFare))}
              </p>

              <p className="mt-2 text-xs text-gray-400">
                Current market average
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <IndianRupee size={21} />
            </div>

          </div>

        </div>

        {/* On Time */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-gray-500">
                Avg. On-Time Rate
              </p>

              <p className="mt-2 text-3xl font-bold text-[#0B1F3A]">
                {Math.round(averageOnTime)}%
              </p>

              <p className="mt-2 text-xs text-gray-400">
                Across tracked carriers
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Activity size={21} />
            </div>

          </div>

        </div>

      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* Market Share */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm xl:col-span-1">

          <div className="flex items-center justify-between">

            <div>
              <h3 className="text-lg font-bold text-[#0B1F3A]">
                Market Share
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Airline share of tracked flights
              </p>
            </div>

            <BarChart3
              size={20}
              className="text-gray-400"
            />

          </div>

          <div className="mt-6 space-y-5">

            {airlinesData.map((airline) => (
              <div key={airline.id}>

                <div className="mb-2 flex items-center justify-between">

                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-700">
                      {airline.name}
                    </span>

                    <span className="text-[10px] text-gray-400">
                      {airline.code}
                    </span>
                  </div>

                  <span className="text-sm font-bold text-[#0B1F3A]">
                    {airline.marketShare}%
                  </span>

                </div>

                <div className="h-2 overflow-hidden rounded-full bg-gray-100">

                  <div
                    className="h-full rounded-full bg-[#1565C0] transition-all duration-500"
                    style={{
                      width: `${airline.marketShare}%`,
                    }}
                  />

                </div>

              </div>
            ))}

          </div>

          <div className="mt-6 rounded-xl bg-gray-50 p-4">

            <p className="text-xs text-gray-500">
              Market leader
            </p>

            <p className="mt-1 text-sm font-bold text-[#0B1F3A]">
              {leadingAirline.name}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              {leadingAirline.marketShare}% of tracked flight volume
            </p>

          </div>

        </div>

        {/* Airline Performance */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm xl:col-span-2">

          <div className="border-b border-gray-100 p-6">

            <div>
              <h3 className="text-lg font-bold text-[#0B1F3A]">
                Airline Performance
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Compare pricing and operational metrics
              </p>
            </div>

          </div>

          {/* Search */}
          <div className="border-b border-gray-100 p-5">

            <div className="relative max-w-md">

              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search airlines..."
                className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
              />

            </div>

          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">

            <table className="w-full">

              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/80">

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Airline
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Flights
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Avg. Fare
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Change
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                    On-Time
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Routes
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Status
                  </th>

                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {filteredAirlines.map((airline) => (
                  <tr
                    key={airline.id}
                    className="transition hover:bg-gray-50/70"
                  >

                    {/* Airline */}
                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-xs font-bold text-[#1565C0]">
                          {airline.code}
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-[#0B1F3A]">
                            {airline.name}
                          </p>

                          <p className="text-[11px] text-gray-400">
                            {airline.marketShare}% market share
                          </p>
                        </div>

                      </div>

                    </td>

                    {/* Flights */}
                    <td className="px-6 py-5 text-center">

                      <span className="text-sm font-semibold text-gray-700">
                        {airline.flights.toLocaleString("en-IN")}
                      </span>

                    </td>

                    {/* Fare */}
                    <td className="px-6 py-5 text-right">

                      <span className="text-sm font-bold text-[#0B1F3A]">
                        {formatFare(airline.averageFare)}
                      </span>

                    </td>

                    {/* Change */}
                    <td className="px-6 py-5 text-center">

                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${getChangeClass(
                          airline.change
                        )}`}
                      >
                        {getChangeIcon(airline.change)}
                        {Math.abs(airline.change)}%
                      </span>

                    </td>

                    {/* On Time */}
                    <td className="px-6 py-5 text-center">

                      <div className="flex flex-col items-center">

                        <span className="text-sm font-semibold text-gray-700">
                          {airline.onTime}%
                        </span>

                        <div className="mt-1 h-1.5 w-16 overflow-hidden rounded-full bg-gray-100">

                          <div
                            className="h-full rounded-full bg-green-500"
                            style={{
                              width: `${airline.onTime}%`,
                            }}
                          />

                        </div>

                      </div>

                    </td>

                    {/* Routes */}
                    <td className="px-6 py-5 text-center">

                      <span className="text-sm font-semibold text-gray-700">
                        {airline.routes}
                      </span>

                    </td>

                    {/* Status */}
                    <td className="px-6 py-5 text-center">

                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClass(
                          airline.status
                        )}`}
                      >
                        {airline.status}
                      </span>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

          {/* Mobile Cards */}
          <div className="divide-y divide-gray-100 md:hidden">

            {filteredAirlines.map((airline) => (
              <div
                key={airline.id}
                className="p-5"
              >

                <div className="flex items-start justify-between gap-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-xs font-bold text-[#1565C0]">
                      {airline.code}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#0B1F3A]">
                        {airline.name}
                      </p>

                      <p className="text-xs text-gray-400">
                        {airline.marketShare}% market share
                      </p>
                    </div>

                  </div>

                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClass(
                      airline.status
                    )}`}
                  >
                    {airline.status}
                  </span>

                </div>

                <div className="mt-5 grid grid-cols-2 gap-4">

                  <div>
                    <p className="text-[11px] text-gray-400">
                      Flights
                    </p>

                    <p className="mt-1 text-sm font-semibold text-gray-700">
                      {airline.flights.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] text-gray-400">
                      Average Fare
                    </p>

                    <p className="mt-1 text-sm font-bold text-[#0B1F3A]">
                      {formatFare(airline.averageFare)}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] text-gray-400">
                      Fare Change
                    </p>

                    <span
                      className={`mt-1 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${getChangeClass(
                        airline.change
                      )}`}
                    >
                      {getChangeIcon(airline.change)}
                      {Math.abs(airline.change)}%
                    </span>
                  </div>

                  <div>
                    <p className="text-[11px] text-gray-400">
                      On-Time Rate
                    </p>

                    <p className="mt-1 text-sm font-semibold text-gray-700">
                      {airline.onTime}%
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] text-gray-400">
                      Routes
                    </p>

                    <p className="mt-1 text-sm font-semibold text-gray-700">
                      {airline.routes}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] text-gray-400">
                      Market Share
                    </p>

                    <p className="mt-1 text-sm font-semibold text-gray-700">
                      {airline.marketShare}%
                    </p>
                  </div>

                </div>

              </div>
            ))}

          </div>

          {/* Empty State */}
          {filteredAirlines.length === 0 && (
            <div className="px-6 py-14 text-center">

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-400">
                <Search size={21} />
              </div>

              <h4 className="mt-4 text-sm font-semibold text-gray-800">
                No airlines found
              </h4>

              <p className="mt-1 text-sm text-gray-500">
                Try searching for a different airline.
              </p>

            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">

            <p className="text-xs text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-700">
                {filteredAirlines.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-700">
                {airlinesData.length}
              </span>{" "}
              airlines
            </p>

            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Clock size={13} />
              Live monitoring
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Airlines;
