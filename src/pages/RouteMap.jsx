import { useEffect, useMemo, useRef, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import {
  MapPinned,
  Plane,
  RefreshCw,
  Search,
  TrendingDown,
  TrendingUp,
  Minus,
  Clock,
  IndianRupee,
  Activity,
  MapPin,
  Navigation,
  X,
  Radio,
} from "lucide-react";

// Real India boundary (Natural-Earth-derived, simplified for the web).
// See the accompanying setup notes for exactly where this file goes.
import indiaGeoJson from "../data/india.json";

/* =========================================================
   ROUTE DATA
========================================================= */

const routes = [
  {
    id: 1,
    from: "DEL",
    fromCity: "Delhi",
    to: "BOM",
    toCity: "Mumbai",
    airline: "IndiGo",
    flightCount: 42,
    fare: 4250,
    change: -8.2,
    status: "Price Drop",
    updated: "2 min ago",
  },
  {
    id: 2,
    from: "BOM",
    fromCity: "Mumbai",
    to: "BLR",
    toCity: "Bengaluru",
    airline: "Air India",
    flightCount: 31,
    fare: 3890,
    change: 4.1,
    status: "Price Rise",
    updated: "4 min ago",
  },
  {
    id: 3,
    from: "DEL",
    fromCity: "Delhi",
    to: "BLR",
    toCity: "Bengaluru",
    airline: "IndiGo",
    flightCount: 38,
    fare: 4620,
    change: -3.7,
    status: "Price Drop",
    updated: "5 min ago",
  },
  {
    id: 4,
    from: "DEL",
    fromCity: "Delhi",
    to: "HYD",
    toCity: "Hyderabad",
    airline: "Akasa Air",
    flightCount: 24,
    fare: 3540,
    change: -6.4,
    status: "Price Drop",
    updated: "7 min ago",
  },
  {
    id: 5,
    from: "BOM",
    fromCity: "Mumbai",
    to: "DEL",
    toCity: "Delhi",
    airline: "Vistara",
    flightCount: 29,
    fare: 4180,
    change: 2.8,
    status: "Price Rise",
    updated: "8 min ago",
  },
  {
    id: 6,
    from: "BLR",
    fromCity: "Bengaluru",
    to: "MAA",
    toCity: "Chennai",
    airline: "IndiGo",
    flightCount: 26,
    fare: 2890,
    change: -5.1,
    status: "Price Drop",
    updated: "9 min ago",
  },
  {
    id: 7,
    from: "CCU",
    fromCity: "Kolkata",
    to: "DEL",
    toCity: "Delhi",
    airline: "Air India",
    flightCount: 21,
    fare: 3970,
    change: 6.3,
    status: "Price Rise",
    updated: "11 min ago",
  },
  {
    id: 8,
    from: "PNQ",
    fromCity: "Pune",
    to: "DEL",
    toCity: "Delhi",
    airline: "SpiceJet",
    flightCount: 18,
    fare: 3260,
    change: -2.4,
    status: "Price Drop",
    updated: "13 min ago",
  },
  {
    id: 9,
    from: "HYD",
    fromCity: "Hyderabad",
    to: "BOM",
    toCity: "Mumbai",
    airline: "IndiGo",
    flightCount: 23,
    fare: 3120,
    change: 3.6,
    status: "Price Rise",
    updated: "15 min ago",
  },
  {
    id: 10,
    from: "MAA",
    fromCity: "Chennai",
    to: "DEL",
    toCity: "Delhi",
    airline: "Akasa Air",
    flightCount: 17,
    fare: 4410,
    change: -7.2,
    status: "Price Drop",
    updated: "17 min ago",
  },
  {
    id: 11,
    from: "AMD",
    fromCity: "Ahmedabad",
    to: "BOM",
    toCity: "Mumbai",
    airline: "IndiGo",
    flightCount: 19,
    fare: 2940,
    change: -4.3,
    status: "Price Drop",
    updated: "18 min ago",
  },
  {
    id: 12,
    from: "DEL",
    fromCity: "Delhi",
    to: "LKO",
    toCity: "Lucknow",
    airline: "Air India",
    flightCount: 16,
    fare: 3150,
    change: 2.1,
    status: "Price Rise",
    updated: "20 min ago",
  },
  {
    id: 13,
    from: "BOM",
    fromCity: "Mumbai",
    to: "GOI",
    toCity: "Goa",
    airline: "Akasa Air",
    flightCount: 14,
    fare: 2780,
    change: -5.8,
    status: "Price Drop",
    updated: "22 min ago",
  },
  {
    id: 14,
    from: "BLR",
    fromCity: "Bengaluru",
    to: "COK",
    toCity: "Kochi",
    airline: "IndiGo",
    flightCount: 15,
    fare: 3010,
    change: -2.9,
    status: "Price Drop",
    updated: "24 min ago",
  },
  {
    id: 15,
    from: "CCU",
    fromCity: "Kolkata",
    to: "GAU",
    toCity: "Guwahati",
    airline: "IndiGo",
    flightCount: 13,
    fare: 2880,
    change: 3.7,
    status: "Price Rise",
    updated: "27 min ago",
  },
];

/* =========================================================
   AIRPORT POSITIONS
   Real latitude/longitude only — no manually estimated x/y.
   To add a new airport later, just add a { code, city, lat, lon }
   entry here. Its on-map pixel position is always derived from
   the same Mercator projection used for the India boundary and
   the route lines, so it will automatically line up correctly.
========================================================= */

const airports = [
  { code: "DEL", city: "Delhi", lat: 28.7041, lon: 77.1025 },
  { code: "JAI", city: "Jaipur", lat: 26.9124, lon: 75.7873 },
  { code: "AMD", city: "Ahmedabad", lat: 23.0225, lon: 72.5714 },
  { code: "LKO", city: "Lucknow", lat: 26.8467, lon: 80.9462 },
  { code: "CCU", city: "Kolkata", lat: 22.5726, lon: 88.3639 },
  { code: "BOM", city: "Mumbai", lat: 19.076, lon: 72.8777 },
  { code: "PNQ", city: "Pune", lat: 18.5204, lon: 73.8567 },
  { code: "GOI", city: "Goa", lat: 15.4909, lon: 73.8278 },
  { code: "HYD", city: "Hyderabad", lat: 17.385, lon: 78.4867 },
  { code: "BLR", city: "Bengaluru", lat: 12.9716, lon: 77.5946 },
  { code: "MAA", city: "Chennai", lat: 13.0827, lon: 80.2707 },
  { code: "COK", city: "Kochi", lat: 9.9312, lon: 76.2673 },
  { code: "GAU", city: "Guwahati", lat: 26.1445, lon: 91.7362 },
];

/* =========================================================
   HELPERS
========================================================= */

function formatFare(value) {
  return `₹${value.toLocaleString("en-IN")}`;
}

// Looks up an airport's static metadata (city name, lat/lon) by code.
// Not for map placement — see the projectedAirports map for that.
function getAirport(code) {
  return airports.find((airport) => airport.code === code);
}

function getChangeIcon(change) {
  if (change < 0) {
    return <TrendingDown size={14} />;
  }

  if (change > 0) {
    return <TrendingUp size={14} />;
  }

  return <Minus size={14} />;
}

function getChangeClass(change) {
  if (change < 0) {
    return "bg-green-50 text-green-600";
  }

  if (change > 0) {
    return "bg-red-50 text-red-600";
  }

  return "bg-gray-100 text-gray-500";
}

// Builds a quadratic-bezier path string for a route between two
// already-projected {x, y} pixel positions (output of the Mercator
// projection below), with an arc height that scales with distance.
function getRoutePath(from, to) {
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;

  const distance = Math.hypot(to.x - from.x, to.y - from.y) || 1;
  const curveHeight = Math.min(60, distance * 0.18);

  return `M ${from.x} ${from.y} Q ${midX} ${midY - curveHeight} ${to.x} ${to.y}`;
}

/* =========================================================
   COMPONENT
========================================================= */

function RouteMap() {
  const [search, setSearch] = useState("");
  const [selectedRoute, setSelectedRoute] = useState(
    routes.find((route) => route.from === "DEL" && route.to === "BOM") ||
      routes[0]
  );
  const [filter, setFilter] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // ---------------------------------------------------------
  // Geographic projection setup
  //
  //   Real India GeoJSON  ->  geoMercator().fitSize(...)
  //                       ->  India boundary <path>
  //                       ->  airport lat/lon projected to px
  //                       ->  route <path>s between those px points
  //
  // The map container is measured with a ResizeObserver so the
  // projection is recalculated whenever the container resizes,
  // which is what keeps everything (map, markers, routes) aligned
  // and responsive without distorting the geography.
  // ---------------------------------------------------------

  const mapContainerRef = useRef(null);
  const [mapSize, setMapSize] = useState({ width: 900, height: 620 });

  useEffect(() => {
    const el = mapContainerRef.current;

    if (!el) return;

    const updateSize = () => {
      setMapSize({
        width: el.clientWidth,
        height: el.clientHeight,
      });
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const projection = useMemo(
    () =>
      geoMercator().fitSize(
        [mapSize.width, mapSize.height],
        indiaGeoJson
      ),
    [mapSize.width, mapSize.height]
  );

  const pathGenerator = useMemo(() => geoPath(projection), [projection]);

  const indiaPath = useMemo(
    () => pathGenerator(indiaGeoJson.features[0]),
    [pathGenerator]
  );

  // Map of airport code -> { code, city, lat, lon, x, y }, where x/y
  // are the projected pixel coordinates for the current map size.
  const projectedAirports = useMemo(() => {
    const map = {};

    airports.forEach((airport) => {
      const point = projection([airport.lon, airport.lat]);

      if (point) {
        map[airport.code] = {
          ...airport,
          x: point[0],
          y: point[1],
        };
      }
    });

    return map;
  }, [projection]);

  function getProjectedAirport(code) {
    return projectedAirports[code];
  }

  const filteredRoutes = useMemo(() => {
    const query = search.toLowerCase().trim();

    return routes.filter((route) => {
      const matchesSearch =
        !query ||
        route.from.toLowerCase().includes(query) ||
        route.to.toLowerCase().includes(query) ||
        route.fromCity.toLowerCase().includes(query) ||
        route.toCity.toLowerCase().includes(query) ||
        route.airline.toLowerCase().includes(query);

      const matchesFilter =
        filter === "all" ||
        (filter === "drops" && route.change < 0) ||
        (filter === "rises" && route.change > 0);

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const totalFlights = routes.reduce(
    (total, route) => total + route.flightCount,
    0
  );

  const averageFare = Math.round(
    routes.reduce((total, route) => total + route.fare, 0) / routes.length
  );

  const priceDrops = routes.filter((route) => route.change < 0).length;

  const priceRises = routes.filter((route) => route.change > 0).length;

  const handleRefresh = () => {
    setIsRefreshing(true);

    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const selectedFrom = getAirport(selectedRoute.from);
  const selectedTo = getAirport(selectedRoute.to);

  return (
    <div className="space-y-6">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#1565C0]">
              <MapPinned size={25} />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#0B1F3A]">
                Route Map
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Real-time airfare movements across India's major aviation
                network
              </p>
            </div>
          </div>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center justify-center gap-2 rounded-lg bg-[#0B1F3A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#12345d] disabled:opacity-70"
          >
            <RefreshCw
              size={17}
              className={isRefreshing ? "animate-spin" : ""}
            />

            {isRefreshing ? "Refreshing..." : "Refresh Map"}
          </button>

        </div>
      </div>

      {/* =====================================================
          LIVE STATUS
      ===================================================== */}

      <div className="flex flex-col gap-3 rounded-xl border border-green-100 bg-green-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-3">

          <div className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
          </div>

          <div>
            <p className="text-sm font-semibold text-green-800">
              Live Route Monitoring Active
            </p>

            <p className="text-xs text-green-700">
              Tracking airfare movements across {routes.length} routes
            </p>
          </div>

        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-green-700">
          <Radio size={14} />
          Updated just now
        </div>

      </div>

      {/* =====================================================
          KPI CARDS
      ===================================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Active Routes
              </p>

              <p className="mt-2 text-2xl font-bold text-[#0B1F3A]">
                {routes.length}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-[#1565C0]">
              <Navigation size={20} />
            </div>

          </div>

          <p className="mt-3 text-xs text-gray-500">
            Major domestic connections
          </p>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Flights Tracked
              </p>

              <p className="mt-2 text-2xl font-bold text-[#0B1F3A]">
                {totalFlights}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
              <Plane size={20} />
            </div>

          </div>

          <p className="mt-3 text-xs text-gray-500">
            Across all monitored routes
          </p>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Average Fare
              </p>

              <p className="mt-2 text-2xl font-bold text-[#0B1F3A]">
                {formatFare(averageFare)}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <IndianRupee size={20} />
            </div>

          </div>

          <p className="mt-3 text-xs text-gray-500">
            Current network average
          </p>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Price Drops
              </p>

              <p className="mt-2 text-2xl font-bold text-green-600">
                {priceDrops}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
              <TrendingDown size={20} />
            </div>

          </div>

          <p className="mt-3 text-xs text-gray-500">
            {priceRises} routes showing increases
          </p>
        </div>

      </div>

      {/* =====================================================
          SEARCH / FILTER
      ===================================================== */}

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div className="relative w-full lg:max-w-md">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search city, airport or airline..."
              className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
            />

          </div>

          <div className="flex flex-wrap gap-2">

            {[
              { label: "All Routes", value: "all" },
              { label: "Price Drops", value: "drops" },
              { label: "Price Rises", value: "rises" },
            ].map((item) => (
              <button
                key={item.value}
                onClick={() => setFilter(item.value)}
                className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${filter === item.value
                    ? "bg-[#1565C0] text-white"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
              >
                {item.label}
              </button>
            ))}

          </div>

        </div>

      </div>

      {/* =====================================================
          MAP + DETAILS
      ===================================================== */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">

        {/* ===================================================
            MAP
        =================================================== */}

        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

          <div className="flex flex-col gap-3 border-b border-gray-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h3 className="text-lg font-bold text-[#0B1F3A]">
                India Airfare Network
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                Live domestic route activity
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs">

              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                <span className="text-gray-500">
                  Fare falling
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                <span className="text-gray-500">
                  Fare rising
                </span>
              </div>

            </div>

          </div>

          {/* MAP AREA */}
          <div
            ref={mapContainerRef}
            className="relative h-[620px] overflow-hidden bg-[#edf4fa]"
          >

            {/* Grid */}
            <div
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage:
                  "linear-gradient(#d6e2ec 1px, transparent 1px), linear-gradient(90deg, #d6e2ec 1px, transparent 1px)",
                backgroundSize: "45px 45px",
              }}
            />

            {/* Decorative map terrain */}
            <div className="absolute inset-0 opacity-30">

              <div className="absolute left-[8%] top-[18%] h-40 w-40 rounded-full bg-white blur-3xl" />

              <div className="absolute right-[4%] top-[35%] h-52 w-52 rounded-full bg-blue-100 blur-3xl" />

              <div className="absolute bottom-[5%] left-[35%] h-48 w-48 rounded-full bg-white blur-3xl" />

            </div>

            {/* =================================================
                GEOGRAPHIC MAP + ROUTES
                One <svg>, one coordinate system: the India boundary
                path and every route path are generated from the
                SAME geoMercator projection, fitted to the current
                pixel size of this container. Because airport pixel
                positions come from that identical projection, route
                lines always terminate exactly on their markers.
            ================================================= */}

            <svg
              viewBox={`0 0 ${mapSize.width} ${mapSize.height}`}
              className="absolute inset-0 h-full w-full"
            >

              <defs>

                <linearGradient
                  id="indiaFill"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#dce8f2" />
                  <stop offset="100%" stopColor="#cdddea" />
                </linearGradient>

                <filter
                  id="routeGlow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur
                    stdDeviation="3"
                    result="blur"
                  />

                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

              </defs>

              {/* Real India boundary, generated by d3-geo from GeoJSON */}
              {indiaPath && (
                <path
                  d={indiaPath}
                  fill="url(#indiaFill)"
                  stroke="#b9cad9"
                  strokeWidth="1.5"
                />
              )}

              {/* Routes */}
              {filteredRoutes.map((route) => {

                const from = getProjectedAirport(route.from);
                const to = getProjectedAirport(route.to);

                if (!from || !to) return null;

                const isSelected =
                  selectedRoute?.id === route.id;

                const path = getRoutePath(from, to);

                const routeColor =
                  route.change < 0
                    ? "#16a34a"
                    : "#dc2626";

                return (
                  <g key={route.id}>

                    {/* Glow */}
                    {isSelected && (
                      <path
                        d={path}
                        fill="none"
                        stroke={routeColor}
                        strokeWidth="8"
                        opacity="0.12"
                        filter="url(#routeGlow)"
                      />
                    )}

                    {/* Route */}
                    <path
                      d={path}
                      fill="none"
                      stroke={routeColor}
                      strokeWidth={
                        isSelected ? "4" : "2"
                      }
                      strokeDasharray={
                        isSelected ? "0" : "7 6"
                      }
                      strokeLinecap="round"
                      opacity={
                        isSelected ? "1" : "0.48"
                      }
                      className="cursor-pointer transition-all duration-200"
                      onClick={() =>
                        setSelectedRoute(route)
                      }
                    />

                    {/* Moving flight dot */}
                    {isSelected && (
                      <circle
                        r="4"
                        fill={routeColor}
                        className="animate-pulse"
                      >
                        <animateMotion
                          dur="2.5s"
                          repeatCount="indefinite"
                          path={path}
                        />
                      </circle>
                    )}

                  </g>
                );
              })}

            </svg>

            {/* =================================================
                AIRPORT MARKERS
                Positioned with pixel left/top computed from the
                same projection as the map and routes above (not
                percentages), so they land exactly on the real
                geographic location and stay correct on resize.
            ================================================= */}

            {airports.map((airport) => {

              const projected = projectedAirports[airport.code];

              if (!projected) return null;

              const isActive =
                selectedRoute?.from === airport.code ||
                selectedRoute?.to === airport.code;

              return (
                <button
                  key={airport.code}
                  onClick={() => {

                    const route = routes.find(
                      (item) =>
                        item.from === airport.code ||
                        item.to === airport.code
                    );

                    if (route) {
                      setSelectedRoute(route);
                    }

                  }}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${projected.x}px`,
                    top: `${projected.y}px`,
                  }}
                >

                  <div
                    className={`relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-white shadow-lg transition-all duration-200 ${isActive
                        ? "scale-125 bg-[#1565C0] text-white"
                        : "bg-white text-[#1565C0] hover:scale-110"
                      }`}
                  >

                    {isActive && (
                      <span className="absolute inset-0 animate-ping rounded-full bg-[#1565C0] opacity-20" />
                    )}

                    <MapPin
                      size={16}
                      className="relative z-10"
                    />

                  </div>

                  <div
                    className={`mt-1 rounded px-1.5 py-0.5 text-[9px] font-bold shadow-sm ${isActive
                        ? "bg-[#0B1F3A] text-white"
                        : "bg-white/95 text-[#0B1F3A]"
                      }`}
                  >
                    {airport.code}
                  </div>

                </button>
              );
            })}

            {/* =================================================
                MAP TITLE
            ================================================= */}

            <div className="absolute left-5 top-5 rounded-xl border border-white/80 bg-white/90 px-4 py-3 shadow-sm backdrop-blur">

              <div className="flex items-center gap-2">

                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-50">
                  <Activity
                    size={15}
                    className="text-green-600"
                  />
                </div>

                <div>
                  <p className="text-xs font-bold text-[#0B1F3A]">
                    Live Network
                  </p>

                  <p className="text-[10px] text-gray-400">
                    India domestic routes
                  </p>
                </div>

              </div>

            </div>

            {/* =================================================
                MAP SCALE
            ================================================= */}

            <div className="absolute bottom-5 left-5 rounded-lg border border-gray-200 bg-white/95 px-3 py-2 shadow-sm">

              <div className="flex items-center gap-2">

                <div className="h-px w-8 bg-gray-500" />

                <span className="text-[10px] font-medium text-gray-500">
                  ~500 km
                </span>

              </div>

            </div>

            {/* =================================================
                ZOOM
            ================================================= */}

            <div className="absolute bottom-5 right-5 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">

              <button className="flex h-9 w-9 items-center justify-center border-b border-gray-100 text-lg text-gray-600 hover:bg-gray-50">
                +
              </button>

              <button className="flex h-9 w-9 items-center justify-center text-lg text-gray-600 hover:bg-gray-50">
                −
              </button>

            </div>

          </div>
        </div>

        {/* ===================================================
            ROUTE DETAILS
        =================================================== */}

        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">

          <div className="border-b border-gray-100 px-6 py-5">

            <div className="flex items-center justify-between">

              <div>
                <h3 className="text-lg font-bold text-[#0B1F3A]">
                  Route Details
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Selected network connection
                </p>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-[#1565C0]">
                <Navigation size={18} />
              </div>

            </div>

          </div>

          <div className="p-6">

            {/* Route */}
            <div className="rounded-xl bg-[#F5F7FB] p-5">

              <div className="flex items-center justify-between">

                <div className="text-center">

                  <p className="text-2xl font-bold text-[#0B1F3A]">
                    {selectedRoute.from}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {selectedFrom?.city}
                  </p>

                </div>

                <div className="flex flex-1 flex-col items-center px-4">

                  <div className="relative flex w-full items-center">

                    <div className="h-px flex-1 border-t border-dashed border-gray-300" />

                    <div className="mx-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-[#1565C0]">
                      <Plane size={15} />
                    </div>

                    <div className="h-px flex-1 border-t border-dashed border-gray-300" />

                  </div>

                  <span className="mt-2 text-[10px] font-medium text-gray-400">
                    {selectedRoute.flightCount} flights
                  </span>

                </div>

                <div className="text-center">

                  <p className="text-2xl font-bold text-[#0B1F3A]">
                    {selectedRoute.to}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {selectedTo?.city}
                  </p>

                </div>

              </div>

            </div>

            {/* Fare */}
            <div className="mt-6">

              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Current Lowest Fare
              </p>

              <div className="mt-2 flex items-end justify-between">

                <p className="text-3xl font-bold text-[#0B1F3A]">
                  {formatFare(selectedRoute.fare)}
                </p>

                <span
                  className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${getChangeClass(
                    selectedRoute.change
                  )}`}
                >
                  {getChangeIcon(selectedRoute.change)}
                  {Math.abs(selectedRoute.change)}%
                </span>

              </div>

            </div>

            {/* Details */}
            <div className="mt-6 space-y-4">

              <div className="flex items-center justify-between border-b border-gray-100 pb-4">

                <span className="flex items-center gap-2 text-sm text-gray-500">
                  <Plane size={16} />
                  Airline
                </span>

                <span className="text-sm font-semibold text-gray-800">
                  {selectedRoute.airline}
                </span>

              </div>

              <div className="flex items-center justify-between border-b border-gray-100 pb-4">

                <span className="flex items-center gap-2 text-sm text-gray-500">
                  <Activity size={16} />
                  Market Status
                </span>

                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${selectedRoute.change < 0
                      ? "bg-green-50 text-green-600"
                      : "bg-red-50 text-red-600"
                    }`}
                >
                  {selectedRoute.status}
                </span>

              </div>

              <div className="flex items-center justify-between border-b border-gray-100 pb-4">

                <span className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock size={16} />
                  Last Updated
                </span>

                <span className="text-sm font-semibold text-gray-800">
                  {selectedRoute.updated}
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="flex items-center gap-2 text-sm text-gray-500">
                  <Navigation size={16} />
                  Flights Tracked
                </span>

                <span className="text-sm font-semibold text-gray-800">
                  {selectedRoute.flightCount}
                </span>

              </div>

            </div>

            <button className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg bg-[#1565C0] px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
              <Search size={16} />
              View Route Analytics
            </button>

          </div>

        </div>

      </div>

      {/* =====================================================
          ROUTE TABLE
      ===================================================== */}

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

        <div className="border-b border-gray-100 px-6 py-5">

          <div className="flex items-center justify-between">

            <div>
              <h3 className="text-lg font-bold text-[#0B1F3A]">
                Monitored Routes
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                Select any route to highlight it on the map
              </p>
            </div>

            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
              {filteredRoutes.length} routes
            </span>

          </div>

        </div>

        <div className="hidden overflow-x-auto md:block">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr className="text-left text-xs uppercase tracking-wide text-gray-400">

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
                  Current Fare
                </th>

                <th className="px-6 py-4 font-semibold">
                  Movement
                </th>

                <th className="px-6 py-4 font-semibold">
                  Updated
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-gray-100">

              {filteredRoutes.map((route) => (

                <tr
                  key={route.id}
                  onClick={() => setSelectedRoute(route)}
                  className={`cursor-pointer transition hover:bg-gray-50 ${selectedRoute?.id === route.id
                      ? "bg-blue-50/50"
                      : ""
                    }`}
                >

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-lg ${route.change < 0
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-600"
                          }`}
                      >
                        <Plane size={16} />
                      </div>

                      <div>

                        <p className="text-sm font-bold text-[#0B1F3A]">
                          {route.from} → {route.to}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {route.fromCity} → {route.toCity}
                        </p>

                      </div>

                    </div>

                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-gray-700">
                    {route.airline}
                  </td>

                  <td className="px-6 py-4 text-sm font-semibold text-gray-700">
                    {route.flightCount}
                  </td>

                  <td className="px-6 py-4 text-sm font-bold text-[#0B1F3A]">
                    {formatFare(route.fare)}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${getChangeClass(
                        route.change
                      )}`}
                    >
                      {getChangeIcon(route.change)}
                      {Math.abs(route.change)}%
                    </span>

                  </td>

                  <td className="px-6 py-4 text-xs text-gray-400">
                    {route.updated}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* MOBILE ROUTES */}

        <div className="divide-y divide-gray-100 md:hidden">

          {filteredRoutes.map((route) => (

            <button
              key={route.id}
              onClick={() => setSelectedRoute(route)}
              className={`flex w-full flex-col gap-4 p-5 text-left transition hover:bg-gray-50 ${selectedRoute?.id === route.id
                  ? "bg-blue-50/50"
                  : ""
                }`}
            >

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${route.change < 0
                        ? "bg-green-50 text-green-600"
                        : "bg-red-50 text-red-600"
                      }`}
                  >
                    <Plane size={16} />
                  </div>

                  <div>

                    <p className="text-sm font-bold text-[#0B1F3A]">
                      {route.from} → {route.to}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      {route.airline}
                    </p>

                  </div>

                </div>

                <span
                  className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${getChangeClass(
                    route.change
                  )}`}
                >
                  {getChangeIcon(route.change)}
                  {Math.abs(route.change)}%
                </span>

              </div>

              <div className="grid grid-cols-3 gap-3 border-t border-gray-100 pt-4">

                <div>
                  <p className="text-[10px] uppercase text-gray-400">
                    Fare
                  </p>

                  <p className="mt-1 text-sm font-bold text-[#0B1F3A]">
                    {formatFare(route.fare)}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase text-gray-400">
                    Flights
                  </p>

                  <p className="mt-1 text-sm font-bold text-gray-700">
                    {route.flightCount}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase text-gray-400">
                    Updated
                  </p>

                  <p className="mt-1 text-sm font-bold text-gray-700">
                    {route.updated}
                  </p>
                </div>

              </div>

            </button>

          ))}

        </div>

        {filteredRoutes.length === 0 && (

          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
              <X size={20} />
            </div>

            <h4 className="mt-4 text-sm font-semibold text-gray-800">
              No routes found
            </h4>

            <p className="mt-1 text-xs text-gray-500">
              Try another airport, city or airline.
            </p>

          </div>

        )}

      </div>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div className="flex flex-col gap-2 border-t border-gray-200 pt-4 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">

        <span>
          Sky Metrics · Route Intelligence
        </span>

        <span>
          Monitoring {routes.length} routes · {totalFlights} flights
        </span>

      </div>

    </div>
  );
}

export default RouteMap;