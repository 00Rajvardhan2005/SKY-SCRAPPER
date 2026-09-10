import { useMemo, useState } from "react";
import {
  Bell,
  BellRing,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Plane,
  Search,
  RefreshCw,
  IndianRupee,
  Filter,
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";

/* =========================
   MOCK ALERT DATA
========================= */

const initialAlerts = [
  {
    id: 1,
    type: "price-drop",
    severity: "high",
    title: "Significant fare drop detected",
    route: "DEL → BOM",
    airline: "IndiGo",
    flight: "6E-521",
    currentFare: 4250,
    previousFare: 4890,
    change: -13.1,
    threshold: 4500,
    time: "2 min ago",
    read: false,
    status: "Active",
  },
  {
    id: 2,
    type: "price-rise",
    severity: "high",
    title: "Fare increased above threshold",
    route: "CCU → DEL",
    airline: "Air India",
    flight: "AI-768",
    currentFare: 3970,
    previousFare: 3735,
    change: 6.3,
    threshold: 3800,
    time: "8 min ago",
    read: false,
    status: "Active",
  },
  {
    id: 3,
    type: "price-drop",
    severity: "medium",
    title: "Fare dropped below target price",
    route: "DEL → HYD",
    airline: "Akasa Air",
    flight: "QP-1421",
    currentFare: 3540,
    previousFare: 3780,
    change: -6.4,
    threshold: 3600,
    time: "14 min ago",
    read: false,
    status: "Active",
  },
  {
    id: 4,
    type: "price-rise",
    severity: "medium",
    title: "Unusual fare increase detected",
    route: "BOM → BLR",
    airline: "Air India",
    flight: "AI-604",
    currentFare: 3890,
    previousFare: 3737,
    change: 4.1,
    threshold: 3800,
    time: "21 min ago",
    read: true,
    status: "Active",
  },
  {
    id: 5,
    type: "price-drop",
    severity: "low",
    title: "Fare movement detected",
    route: "BLR → MAA",
    airline: "IndiGo",
    flight: "6E-6139",
    currentFare: 2890,
    previousFare: 3045,
    change: -5.1,
    threshold: 3000,
    time: "32 min ago",
    read: true,
    status: "Active",
  },
  {
    id: 6,
    type: "system",
    severity: "low",
    title: "Route monitoring updated",
    route: "MAA → DEL",
    airline: "Akasa Air",
    flight: "QP-1134",
    currentFare: 4410,
    previousFare: 4410,
    change: 0,
    threshold: 4500,
    time: "45 min ago",
    read: true,
    status: "Resolved",
  },
];

/* =========================
   HELPERS
========================= */

const formatFare = (value) =>
  `₹${value.toLocaleString("en-IN")}`;

const getSeverityClass = (severity) => {
  switch (severity) {
    case "high":
      return "bg-red-50 text-red-600 border-red-100";

    case "medium":
      return "bg-yellow-50 text-yellow-700 border-yellow-100";

    default:
      return "bg-blue-50 text-blue-600 border-blue-100";
  }
};

const getSeverityDot = (severity) => {
  switch (severity) {
    case "high":
      return "bg-red-500";

    case "medium":
      return "bg-yellow-500";

    default:
      return "bg-blue-500";
  }
};

const getChangeClass = (change) => {
  if (change < 0) return "text-green-600";
  if (change > 0) return "text-red-500";
  return "text-gray-500";
};

const getAlertIcon = (alert) => {
  if (alert.type === "price-drop") {
    return (
      <TrendingDown
        size={20}
        className="text-green-600"
      />
    );
  }

  if (alert.type === "price-rise") {
    return (
      <TrendingUp
        size={20}
        className="text-red-500"
      />
    );
  }

  return (
    <BellRing
      size={20}
      className="text-[#1565C0]"
    />
  );
};

const getAlertIconBackground = (alert) => {
  if (alert.type === "price-drop") {
    return "bg-green-50";
  }

  if (alert.type === "price-rise") {
    return "bg-red-50";
  }

  return "bg-blue-50";
};

/* =========================
   COMPONENT
========================= */

function Alerts() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  /* =========================
     FILTER ALERTS
  ========================= */

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const searchMatch =
        alert.route
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        alert.airline
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        alert.title
          .toLowerCase()
          .includes(search.toLowerCase());

      const filterMatch =
        filter === "all" ||
        (filter === "unread" && !alert.read) ||
        (filter === "price-drop" &&
          alert.type === "price-drop") ||
        (filter === "price-rise" &&
          alert.type === "price-rise") ||
        (filter === "high" &&
          alert.severity === "high");

      return searchMatch && filterMatch;
    });
  }, [alerts, search, filter]);

  /* =========================
     COUNTS
  ========================= */

  const activeAlerts = alerts.filter(
    (alert) => alert.status === "Active"
  ).length;

  const unreadAlerts = alerts.filter(
    (alert) => !alert.read
  ).length;

  const priceDropAlerts = alerts.filter(
    (alert) => alert.type === "price-drop"
  ).length;

  const criticalAlerts = alerts.filter(
    (alert) => alert.severity === "high"
  ).length;

  /* =========================
     ACTIONS
  ========================= */

  const markAsRead = (id) => {
    setAlerts((current) =>
      current.map((alert) =>
        alert.id === id
          ? { ...alert, read: true }
          : alert
      )
    );
  };

  const dismissAlert = (id) => {
    setAlerts((current) =>
      current.map((alert) =>
        alert.id === id
          ? { ...alert, status: "Resolved", read: true }
          : alert
      )
    );
  };

  const markAllAsRead = () => {
    setAlerts((current) =>
      current.map((alert) => ({
        ...alert,
        read: true,
      }))
    );
  };

  const handleRefresh = () => {
    setIsRefreshing(true);

    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <Bell
                size={25}
                className="text-[#1565C0]"
              />
            </div>

            <div>

              <h1 className="text-3xl font-bold text-[#0B1F3A]">
                Alerts
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Monitor important airfare changes and route activity.
              </p>

            </div>

          </div>

          <div className="flex flex-col gap-2 sm:flex-row">

            <button
              onClick={markAllAsRead}
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
            >
              <CheckCircle2 size={17} />
              Mark all read
            </button>

            <button
              onClick={handleRefresh}
              className="flex items-center justify-center gap-2 rounded-lg bg-[#0B1F3A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1565C0]"
            >
              <RefreshCw
                size={17}
                className={
                  isRefreshing ? "animate-spin" : ""
                }
              />

              {isRefreshing
                ? "Refreshing..."
                : "Refresh Alerts"}
            </button>

          </div>

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
              Alert Monitoring Active
            </p>

            <p className="text-xs text-green-700">
              Watching airfare changes across monitored routes
            </p>

          </div>

        </div>

        <div className="flex items-center gap-2 text-xs text-green-700">
          <Clock size={14} />
          Last scan 2 minutes ago
        </div>

      </div>

      {/* =========================
          SUMMARY CARDS
      ========================= */}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {/* Active */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Active Alerts
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[#0B1F3A]">
                {activeAlerts}
              </h2>

            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
              <Bell
                size={19}
                className="text-[#1565C0]"
              />
            </div>

          </div>

          <p className="mt-3 text-xs text-gray-500">
            Currently being monitored
          </p>

        </div>

        {/* Unread */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Unread
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[#0B1F3A]">
                {unreadAlerts}
              </h2>

            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50">
              <BellRing
                size={19}
                className="text-orange-500"
              />
            </div>

          </div>

          <p className="mt-3 text-xs text-orange-600">
            Require your attention
          </p>

        </div>

        {/* Price Drops */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Price Drops
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[#0B1F3A]">
                {priceDropAlerts}
              </h2>

            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
              <TrendingDown
                size={19}
                className="text-green-600"
              />
            </div>

          </div>

          <p className="mt-3 text-xs text-green-600">
            Potential booking opportunities
          </p>

        </div>

        {/* Critical */}
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Critical
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[#0B1F3A]">
                {criticalAlerts}
              </h2>

            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
              <AlertTriangle
                size={19}
                className="text-red-500"
              />
            </div>

          </div>

          <p className="mt-3 text-xs text-red-500">
            High priority alerts
          </p>

        </div>

      </div>

      {/* =========================
          SEARCH + FILTERS
      ========================= */}

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          {/* Search */}
          <div className="relative w-full lg:max-w-md">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search alerts, routes, airlines..."
              className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
            />

          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">

            <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
              <Filter size={15} />
              Filter:
            </div>

            {[
              { label: "All", value: "all" },
              { label: "Unread", value: "unread" },
              { label: "Price Drops", value: "price-drop" },
              { label: "Price Rises", value: "price-rise" },
              { label: "Critical", value: "high" },
            ].map((item) => (

              <button
                key={item.value}
                onClick={() =>
                  setFilter(item.value)
                }
                className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                  filter === item.value
                    ? "bg-[#1565C0] text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {item.label}
              </button>

            ))}

          </div>

        </div>

      </div>

      {/* =========================
          ALERT LIST
      ========================= */}

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">

        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">

          <div>

            <h2 className="text-lg font-bold text-[#0B1F3A]">
              Recent Alerts
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {filteredAlerts.length} alerts matching your filters
            </p>

          </div>

          <div className="hidden items-center gap-2 text-xs text-gray-400 sm:flex">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            Live monitoring
          </div>

        </div>

        {/* Alerts */}
        <div className="divide-y divide-gray-100">

          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert) => (

              <div
                key={alert.id}
                className={`p-5 transition hover:bg-gray-50/70 ${
                  !alert.read
                    ? "bg-blue-50/20"
                    : ""
                }`}
              >

                <div className="flex flex-col gap-5 lg:flex-row lg:items-center">

                  {/* Icon */}
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${getAlertIconBackground(
                      alert
                    )}`}
                  >
                    {getAlertIcon(alert)}
                  </div>

                  {/* Main Info */}
                  <div className="min-w-0 flex-1">

                    <div className="flex flex-wrap items-center gap-2">

                      {!alert.read && (
                        <span className="h-2 w-2 rounded-full bg-[#1565C0]"></span>
                      )}

                      <h3 className="text-sm font-bold text-[#0B1F3A]">
                        {alert.title}
                      </h3>

                      <span
                        className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase ${getSeverityClass(
                          alert.severity
                        )}`}
                      >
                        {alert.severity}
                      </span>

                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">

                      <span className="flex items-center gap-1.5 font-semibold text-[#0B1F3A]">
                        <Plane size={13} />
                        {alert.route}
                      </span>

                      <span>
                        {alert.airline}
                      </span>

                      <span>
                        Flight {alert.flight}
                      </span>

                      <span className="flex items-center gap-1">
                        <Clock size={13} />
                        {alert.time}
                      </span>

                    </div>

                  </div>

                  {/* Fare */}
                  <div className="min-w-[170px]">

                    <p className="text-xs text-gray-400">
                      Current Fare
                    </p>

                    <div className="mt-1 flex items-center gap-2">

                      <span className="text-lg font-bold text-[#0B1F3A]">
                        {formatFare(alert.currentFare)}
                      </span>

                      <span
                        className={`flex items-center gap-0.5 text-xs font-semibold ${getChangeClass(
                          alert.change
                        )}`}
                      >
                        {alert.change < 0 ? (
                          <ArrowDownRight size={13} />
                        ) : alert.change > 0 ? (
                          <ArrowUpRight size={13} />
                        ) : null}

                        {alert.change !== 0
                          ? `${Math.abs(alert.change)}%`
                          : "No change"}
                      </span>

                    </div>

                    <p className="mt-1 text-[11px] text-gray-400">
                      Threshold: {formatFare(alert.threshold)}
                    </p>

                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2">

                    {alert.status === "Active" ? (
                      <span className="flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                        Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-500">
                        <CheckCircle2 size={13} />
                        Resolved
                      </span>
                    )}

                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">

                    {!alert.read && (
                      <button
                        onClick={() =>
                          markAsRead(alert.id)
                        }
                        className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600 transition hover:bg-gray-100"
                      >
                        Mark read
                      </button>
                    )}

                    {alert.status === "Active" && (
                      <button
                        onClick={() =>
                          dismissAlert(alert.id)
                        }
                        className="rounded-lg border border-gray-200 p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                        title="Dismiss alert"
                      >
                        <XCircle size={17} />
                      </button>
                    )}

                  </div>

                </div>

              </div>

            ))
          ) : (

            /* Empty State */
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                <Bell
                  size={25}
                  className="text-gray-400"
                />
              </div>

              <h3 className="mt-4 text-sm font-bold text-[#0B1F3A]">
                No alerts found
              </h3>

              <p className="mt-1 max-w-sm text-xs text-gray-500">
                Try changing your search or filter settings
                to find more alerts.
              </p>

            </div>

          )}

        </div>

      </div>

      {/* =========================
          ALERT LEGEND
      ========================= */}

      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h3 className="text-sm font-bold text-[#0B1F3A]">
              Alert Priority
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Alerts are automatically prioritized based on
              fare movement and configured thresholds.
            </p>

          </div>

          <div className="flex flex-wrap gap-4">

            <div className="flex items-center gap-2">

              <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>

              <span className="text-xs text-gray-500">
                High
              </span>

            </div>

            <div className="flex items-center gap-2">

              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500"></span>

              <span className="text-xs text-gray-500">
                Medium
              </span>

            </div>

            <div className="flex items-center gap-2">

              <span className="h-2.5 w-2.5 rounded-full bg-blue-500"></span>

              <span className="text-xs text-gray-500">
                Low
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* =========================
          FOOTER
      ========================= */}

      <div className="flex flex-col gap-2 border-t border-gray-200 pt-4 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">

        <span>
          SKY SCRAPPER Alert Engine
        </span>

        <span>
          Real-time airfare monitoring active
        </span>

      </div>

    </div>
  );
}

export default Alerts;

