
import { useMemo, useState } from "react";
import {
  Search,
  RefreshCw,
  Map,
  Plane,
  TrendingUp,
  TrendingDown,
  Minus,
  Clock,
  ArrowRight,
  IndianRupee,
} from "lucide-react";

const routesData = [
  {
    id: 1,
    origin: "Delhi",
    originCode: "DEL",
    destination: "Mumbai",
    destinationCode: "BOM",
    airline: "IndiGo",
    flights: 42,
    fare: 4250,
    change: -8.2,
    updated: "2 min ago",
    status: "Popular",
  },
  {
    id: 2,
    origin: "Mumbai",
    originCode: "BOM",
    destination: "Bengaluru",
    destinationCode: "BLR",
    airline: "Air India",
    flights: 31,
    fare: 3890,
    change: 4.1,
    updated: "4 min ago",
    status: "Trending",
  },
  {
    id: 3,
    origin: "Delhi",
    originCode: "DEL",
    destination: "Bengaluru",
    destinationCode: "BLR",
    airline: "IndiGo",
    flights: 38,
    fare: 4620,
    change: -3.7,
    updated: "5 min ago",
    status: "Popular",
  },
  {
    id: 4,
    origin: "Delhi",
    originCode: "DEL",
    destination: "Hyderabad",
    destinationCode: "HYD",
    airline: "Akasa Air",
    flights: 24,
    fare: 3540,
    change: -6.4,
    updated: "7 min ago",
    status: "Stable",
  },
  {
    id: 5,
    origin: "Mumbai",
    originCode: "BOM",
    destination: "Delhi",
    destinationCode: "DEL",
    airline: "Vistara",
    flights: 29,
    fare: 4180,
    change: 2.8,
    updated: "8 min ago",
    status: "Stable",
  },
  {
    id: 6,
    origin: "Bengaluru",
    originCode: "BLR",
    destination: "Chennai",
    destinationCode: "MAA",
    airline: "IndiGo",
    flights: 26,
    fare: 2890,
    change: -5.1,
    updated: "9 min ago",
    status: "Popular",
  },
  {
    id: 7,
    origin: "Kolkata",
    originCode: "CCU",
    destination: "Delhi",
    destinationCode: "DEL",
    airline: "Air India",
    flights: 21,
    fare: 3970,
    change: 6.3,
    updated: "11 min ago",
    status: "Trending",
  },
  {
    id: 8,
    origin: "Pune",
    originCode: "PNQ",
    destination: "Delhi",
    destinationCode: "DEL",
    airline: "SpiceJet",
    flights: 18,
    fare: 3260,
    change: -2.4,
    updated: "13 min ago",
    status: "Stable",
  },
  {
    id: 9,
    origin: "Hyderabad",
    originCode: "HYD",
    destination: "Mumbai",
    destinationCode: "BOM",
    airline: "IndiGo",
    flights: 23,
    fare: 3120,
    change: 3.6,
    updated: "15 min ago",
    status: "Stable",
  },
  {
    id: 10,
    origin: "Chennai",
    originCode: "MAA",
    destination: "Delhi",
    destinationCode: "DEL",
    airline: "Akasa Air",
    flights: 17,
    fare: 4410,
    change: -7.2,
    updated: "17 min ago",
    status: "Popular",
  },
];

function Routes() {
  const [search, setSearch] = useState("");
  const [origin, setOrigin] = useState("All Origins");
  const [destination, setDestination] = useState("All Destinations");
  const [refreshing, setRefreshing] = useState(false);

  const origins = useMemo(() => {
    return [
      "All Origins",
      ...new Set(routesData.map((route) => route.origin)),
    ];
  }, []);

  const destinations = useMemo(() => {
    return [
      "All Destinations",
      ...new Set(routesData.map((route) => route.destination)),
    ];
  }, []);

  const filteredRoutes = useMemo(() => {
    return routesData.filter((route) => {
      const searchTerm = search.toLowerCase();

      const matchesSearch =
        route.origin.toLowerCase().includes(searchTerm) ||
        route.destination.toLowerCase().includes(searchTerm) ||
        route.originCode.toLowerCase().includes(searchTerm) ||
        route.destinationCode.toLowerCase().includes(searchTerm) ||
        route.airline.toLowerCase().includes(searchTerm);

      const matchesOrigin =
        origin === "All Origins" || route.origin === origin;

      const matchesDestination =
        destination === "All Destinations" ||
        route.destination === destination;

      return matchesSearch && matchesOrigin && matchesDestination;
    });
  }, [search, origin, destination]);

  const totalRoutes = routesData.length;

  const averageFare =
    routesData.reduce((sum, route) => sum + route.fare, 0) /
    routesData.length;

  const lowestFare = Math.min(
    ...routesData.map((route) => route.fare)
  );

  const trendingRoutes = routesData.filter(
    (route) => route.status === "Trending"
  ).length;

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
      return "text-red-600 bg-red-50";
    }

    if (change < 0) {
      return "text-green-600 bg-green-50";
    }

    return "text-gray-500 bg-gray-50";
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Popular":
        return "bg-blue-50 text-blue-700";

      case "Trending":
        return "bg-orange-50 text-orange-700";

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
              <Map size={24} />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#0B1F3A]">
                Routes
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Monitor airfare trends across major Indian flight routes
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

            {refreshing ? "Refreshing..." : "Refresh Routes"}
          </button>

        </div>
      </div>

      {/* Live Monitoring Status */}
      <div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
          </span>

          <div>
            <p className="text-sm font-semibold text-gray-800">
              Route monitoring is active
            </p>

            <p className="text-xs text-gray-500">
              Airfare data is being collected continuously
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock size={14} />
          Updated continuously
        </div>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {/* Total Routes */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-gray-500">
                Monitored Routes
              </p>

              <p className="mt-2 text-3xl font-bold text-[#0B1F3A]">
                {totalRoutes}
              </p>

              <p className="mt-2 text-xs text-gray-400">
                Active routes
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#1565C0]">
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
                Across monitored routes
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <IndianRupee size={21} />
            </div>

          </div>
        </div>

        {/* Lowest Fare */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-gray-500">
                Lowest Fare
              </p>

              <p className="mt-2 text-3xl font-bold text-[#0B1F3A]">
                {formatFare(lowestFare)}
              </p>

              <p className="mt-2 text-xs text-gray-400">
                Best available fare
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <TrendingDown size={21} />
            </div>

          </div>
        </div>

        {/* Trending Routes */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-gray-500">
                Trending Routes
              </p>

              <p className="mt-2 text-3xl font-bold text-[#0B1F3A]">
                {trendingRoutes}
              </p>

              <p className="mt-2 text-xs text-gray-400">
                Showing increased demand
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
              <TrendingUp size={21} />
            </div>

          </div>
        </div>

      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

          {/* Search */}
          <div className="relative lg:col-span-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search routes or airlines..."
              className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
            />
          </div>

          {/* Origin */}
          <select
            value={origin}
            onChange={(event) => setOrigin(event.target.value)}
            className="h-11 rounded-lg border border-gray-200 bg-gray-50 px-4 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:bg-white"
          >
            {origins.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          {/* Destination */}
          <select
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            className="h-11 rounded-lg border border-gray-200 bg-gray-50 px-4 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:bg-white"
          >
            {destinations.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

        </div>
      </div>

      {/* Routes Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

        {/* Table Header */}
        <div className="border-b border-gray-100 p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h3 className="text-lg font-bold text-[#0B1F3A]">
                Monitored Routes
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                {filteredRoutes.length} routes matching your filters
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              Live data
            </div>

          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full">

            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/80">

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Route
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Airline
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Flights
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Current Fare
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Change
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Updated
                </th>

              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">

              {filteredRoutes.map((route) => (
                <tr
                  key={route.id}
                  className="transition hover:bg-gray-50/70"
                >

                  {/* Route */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">

                      <div className="flex items-center gap-2">

                        <div>
                          <p className="text-sm font-bold text-[#0B1F3A]">
                            {route.originCode}
                          </p>

                          <p className="text-[11px] text-gray-400">
                            {route.origin}
                          </p>
                        </div>

                        <ArrowRight
                          size={16}
                          className="text-gray-400"
                        />

                        <div>
                          <p className="text-sm font-bold text-[#0B1F3A]">
                            {route.destinationCode}
                          </p>

                          <p className="text-[11px] text-gray-400">
                            {route.destination}
                          </p>
                        </div>

                      </div>

                    </div>
                  </td>

                  {/* Airline */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#1565C0]">
                        <Plane size={15} />
                      </div>

                      <span className="text-sm font-medium text-gray-700">
                        {route.airline}
                      </span>
                    </div>
                  </td>

                  {/* Flights */}
                  <td className="px-6 py-5 text-center">
                    <span className="text-sm font-semibold text-gray-700">
                      {route.flights}
                    </span>
                  </td>

                  {/* Fare */}
                  <td className="px-6 py-5 text-right">
                    <span className="text-sm font-bold text-[#0B1F3A]">
                      {formatFare(route.fare)}
                    </span>
                  </td>

                  {/* Change */}
                  <td className="px-6 py-5 text-center">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${getChangeClass(
                        route.change
                      )}`}
                    >
                      {getChangeIcon(route.change)}
                      {Math.abs(route.change)}%
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5 text-center">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClass(
                        route.status
                      )}`}
                    >
                      {route.status}
                    </span>
                  </td>

                  {/* Updated */}
                  <td className="px-6 py-5 text-right">
                    <span className="text-xs text-gray-500">
                      {route.updated}
                    </span>
                  </td>

                </tr>
              ))}

            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="divide-y divide-gray-100 md:hidden">

          {filteredRoutes.map((route) => (
            <div
              key={route.id}
              className="p-5"
            >

              <div className="flex items-start justify-between gap-4">

                <div>
                  <div className="flex items-center gap-2">

                    <span className="text-sm font-bold text-[#0B1F3A]">
                      {route.originCode}
                    </span>

                    <ArrowRight
                      size={14}
                      className="text-gray-400"
                    />

                    <span className="text-sm font-bold text-[#0B1F3A]">
                      {route.destinationCode}
                    </span>

                  </div>

                  <p className="mt-1 text-xs text-gray-400">
                    {route.origin} to {route.destination}
                  </p>
                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClass(
                    route.status
                  )}`}
                >
                  {route.status}
                </span>

              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">

                <div>
                  <p className="text-[11px] text-gray-400">
                    Airline
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {route.airline}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-gray-400">
                    Flights
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {route.flights}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-gray-400">
                    Current Fare
                  </p>

                  <p className="mt-1 text-sm font-bold text-[#0B1F3A]">
                    {formatFare(route.fare)}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-gray-400">
                    Fare Change
                  </p>

                  <span
                    className={`mt-1 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${getChangeClass(
                      route.change
                    )}`}
                  >
                    {getChangeIcon(route.change)}
                    {Math.abs(route.change)}%
                  </span>
                </div>

              </div>

              <div className="mt-4 flex items-center gap-1 text-[11px] text-gray-400">
                <Clock size={12} />
                Updated {route.updated}
              </div>

            </div>
          ))}

        </div>

        {/* Empty State */}
        {filteredRoutes.length === 0 && (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-400">
              <Search size={21} />
            </div>

            <h4 className="mt-4 text-sm font-semibold text-gray-800">
              No routes found
            </h4>

            <p className="mt-1 text-sm text-gray-500">
              Try changing your search or route filters.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="flex flex-col gap-3 border-t border-gray-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-xs text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-700">
              {filteredRoutes.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-700">
              {routesData.length}
            </span>{" "}
            routes
          </p>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Clock size={13} />
            Data refreshes automatically
          </div>

        </div>

      </div>

    </div>
  );
}

export default Routes;

