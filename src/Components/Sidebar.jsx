import logo from "../assets/logo.png";
import {
  LayoutDashboard,
  Plane,
  Map,
  Building2,
  BarChart3,
  Bell,
  MapPinned,
  FileText,
  Settings,
  CircleHelp,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    page: "dashboard",
  },
  {
    name: "Live Fares",
    icon: Plane,
    page: "live-fares",
  },
  {
    name: "Routes",
    icon: Map,
    page: "routes",
  },
  {
    name: "AirLines",
    icon: Building2,
    page: "airlines",
  },
  {
    name: "APIx Analytics",
    icon: BarChart3,
    page: "analytics",
  },
  {
    name: "Alerts",
    icon: Bell,
    page: "alerts",
    badge: 3,
  },
  {
    name: "Route Map",
    icon: MapPinned,
    page: "route-map",
  },
  {
    name: "Reports",
    icon: FileText,
    page: "reports",
  },
];

function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-[260px] flex-col bg-[#0B1F3A] px-4 py-6 text-white">

      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-white/10 px-2 pb-7">
        <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-white p-1 shadow-sm">
          <img
            src={logo}
            alt="Sky Metrics Logo"
            className="h-full w-full object-contain"
          />
        </div>

        <div>
          <h2 className="text-[15px] font-bold tracking-wide">
            SKY METRICS
          </h2>

          <span className="text-[10px] text-[#9FB0C8]">
            Real-Time Airfare Index
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="mt-7">
        <p className="mb-3 px-3 text-[10px] font-semibold tracking-[1.2px] text-[#7286A3]">
          MAIN MENU
        </p>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.page;

            return (
              <button
                key={item.name}
                onClick={() => setActivePage(item.page)}
                className={`group flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium transition-all duration-200 ${isActive
                    ? "bg-[#1565C0] text-white shadow-lg shadow-blue-900/20"
                    : "text-[#AEBBD0] hover:bg-white/10 hover:text-white"
                  }`}
              >
                <Icon size={19} />

                <span>{item.name}</span>

                {/* Notification Badge */}
                {item.badge && (
                  <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
                    {item.badge}
                  </span>
                )}

                {/* Active Arrow */}
                {isActive && (
                  <ChevronRight
                    size={16}
                    className="ml-auto"
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="mt-auto">
        <button
          onClick={() => setActivePage("settings")}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium text-[#AEBBD0] transition hover:bg-white/10 hover:text-white"
        >
          <Settings size={19} />
          <span>Settings</span>
        </button>

        <button
          onClick={() => setActivePage("help")}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium text-[#AEBBD0] transition hover:bg-white/10 hover:text-white"
        >
          <CircleHelp size={19} />
          <span>Help & Support</span>
        </button>

        {/* System Status */}
        <div className="mt-4 flex items-center gap-3 rounded-xl bg-white/5 p-3">
          <div className="h-2.5 w-2.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />

          <div>
            <strong className="block text-[11px] font-semibold">
              System Online
            </strong>

            <span className="mt-0.5 block text-[9px] text-[#8193AC]">
              Data collection active
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
