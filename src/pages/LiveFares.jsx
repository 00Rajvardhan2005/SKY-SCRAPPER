import { useMemo, useState } from "react";
import {
  Search,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Minus,
  Plane,
  Clock,
} from "lucide-react";

function LiveFares() {
  const [search, setSearch] = useState("");
  const [airline, setAirline] = useState("All Airlines");
  const [refreshing, setRefreshing] = useState(false);

  // Temporary fare data
  // Replace this with backend/API data later
  const fares = [
    {
      airline: "IndiGo",
      flight: "6E 2045",
      route: "Delhi → Mumbai",
      fare: 4250,
      change: 5.2,
      updated: "2 min ago",
    },
    {
      airline: "Air India",
      flight: "AI 864",
      route: "Mumbai → Delhi",
      fare: 4680,
      change: -2.1,
      updated: "3 min ago",
    },
    {
      airline: "Akasa Air",
      flight: "QP 1123",
      route: "Bangalore → Delhi",
      fare: 3890,
      change: 3.8,
      updated: "1 min ago",
    },
    {
      airline: "SpiceJet",
      flight: "SG 8152",
      route: "Delhi → Bangalore",
      fare: 4520,
      change: -1.5,
      updated: "4 min ago",
    },
    {
      airline: "IndiGo",
      flight: "6E 5312",
      route: "Mumbai → Bangalore",
      fare: 3650,
      change: 2.7,
      updated: "2 min ago",
    },
    {
      airline: "Air India",
      flight: "AI 640",
      route: "Delhi → Hyderabad",
      fare: 5100,
      change: 6.4,
      updated: "5 min ago",
    },
    {
      airline: "Vistara",
      flight: "UK 955",
      route: "Bangalore → Mumbai",
      fare: 4720,
      change: -3.2,
      updated: "2 min ago",
    },
    {
      airline: "Akasa Air",
      flight: "QP 1402",
      route: "Hyderabad → Delhi",
      fare: 4180,
      change: 1.9,
      updated: "3 min ago",
    },
  ];

  const handleRefresh = () => {
    if (refreshing) return;

    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const filteredFares = useMemo(() => {
    const query = search.trim().toLowerCase();

    return fares.filter((item) => {
      const matchesSearch =
        !query ||
        item.airline.toLowerCase().includes(query) ||
        item.route.toLowerCase().includes(query) ||
        item.flight.toLowerCase().includes(query);

      const matchesAirline =
        airline === "All Airlines" || item.airline === airline;

      return matchesSearch && matchesAirline;
    });
  }, [search, airline]);

  const lowestFare = useMemo(
    () => Math.min(...fares.map((item) => item.fare)),
    []
  );

  const highestFare = useMemo(
    () => Math.max(...fares.map((item) => item.fare)),
    []
  );

  const averageFare = useMemo(
    () =>
      Math.round(
        fares.reduce((sum, item) => sum + item.fare, 0) / fares.length
      ),
    []
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-50">
              <Plane className="w-7 h-7 text-blue-600" />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#0B1F3A]">
                Live Fares
              </h2>

              <p className="mt-1 text-gray-500">
                Monitor real-time airfare prices across major routes
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0B1F3A] text-white hover:bg-[#16365f] disabled:opacity-70 disabled:cursor-not-allowed transition"
          >
            <RefreshCw
              className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
            />

            {refreshing ? "Refreshing..." : "Refresh Fares"}
          </button>
        </div>
      </div>

      {/* Live Status */}
      <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-5 py-4 shadow-sm">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
        </span>

        <span className="text-sm font-medium text-gray-700">
          Live fare monitoring is active
        </span>

        <span className="text-sm text-gray-400">
          • Updated continuously
        </span>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Lowest Fare */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Lowest Fare</p>

              <h3 className="text-3xl font-bold text-[#0B1F3A] mt-2">
                ₹{lowestFare.toLocaleString("en-IN")}
              </h3>
            </div>

            <div className="p-3 rounded-xl bg-green-50">
              <TrendingDown className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Average Fare */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Average Fare</p>

              <h3 className="text-3xl font-bold text-[#0B1F3A] mt-2">
                ₹{averageFare.toLocaleString("en-IN")}
              </h3>
            </div>

            <div className="p-3 rounded-xl bg-blue-50">
              <Minus className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Highest Fare */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Highest Fare</p>

              <h3 className="text-3xl font-bold text-[#0B1F3A] mt-2">
                ₹{highestFare.toLocaleString("en-IN")}
              </h3>
            </div>

            <div className="p-3 rounded-xl bg-red-50">
              <TrendingUp className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

            <input
              type="text"
              placeholder="Search airline, route or flight..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Airline Filter */}
          <select
            value={airline}
            onChange={(e) => setAirline(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All Airlines">All Airlines</option>
            <option value="IndiGo">IndiGo</option>
            <option value="Air India">Air India</option>
            <option value="Akasa Air">Akasa Air</option>
            <option value="SpiceJet">SpiceJet</option>
            <option value="Vistara">Vistara</option>
          </select>
        </div>
      </div>

      {/* Fare Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-[#0B1F3A]">
            Current Airfares
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Latest available fares being monitored
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Airline
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Flight
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Route
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Current Fare
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Change
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Updated
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredFares.length > 0 ? (
                filteredFares.map((item) => (
                  <tr
                    key={item.flight}
                    className="hover:bg-gray-50 transition"
                  >
                    {/* Airline */}
                    <td className="px-6 py-5">
                      <div className="font-semibold text-[#0B1F3A]">
                        {item.airline}
                      </div>
                    </td>

                    {/* Flight */}
                    <td className="px-6 py-5">
                      <span className="text-gray-600">
                        {item.flight}
                      </span>
                    </td>

                    {/* Route */}
                    <td className="px-6 py-5">
                      <span className="text-gray-700">
                        {item.route}
                      </span>
                    </td>

                    {/* Fare */}
                    <td className="px-6 py-5">
                      <span className="font-bold text-[#0B1F3A]">
                        ₹{item.fare.toLocaleString("en-IN")}
                      </span>
                    </td>

                    {/* Change */}
                    <td className="px-6 py-5">
                      <div
                        className={`flex items-center gap-1 font-semibold ${
                          item.change > 0
                            ? "text-red-500"
                            : item.change < 0
                            ? "text-green-600"
                            : "text-gray-500"
                        }`}
                      >
                        {item.change > 0 ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : item.change < 0 ? (
                          <TrendingDown className="w-4 h-4" />
                        ) : (
                          <Minus className="w-4 h-4" />
                        )}

                        {item.change > 0 ? "+" : ""}
                        {item.change}%
                      </div>
                    </td>

                    {/* Updated */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Clock className="w-4 h-4" />
                        {item.updated}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-12 text-gray-500"
                  >
                    No fares found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LiveFares;