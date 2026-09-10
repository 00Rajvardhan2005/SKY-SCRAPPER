import {
  Search,
  Bell,
  UserCircle,
  ChevronDown,
} from "lucide-react";

function Header() {
  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-40">

      {/* Left Section */}
      <div>
        <h1 className="text-2xl font-bold text-[#0B1F3A]">
          Dashboard
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Real-time airfare intelligence for India
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">

        {/* Search */}
        <div className="relative">
          <Search
            size={19}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search routes, airlines..."
            className="w-64 h-10 pl-10 pr-4 rounded-lg border border-gray-200 
                       bg-gray-50 text-sm outline-none
                       focus:border-blue-500 focus:bg-white transition"
          />
        </div>

        {/* Notification */}
        <button
          className="relative w-10 h-10 flex items-center justify-center 
                     rounded-lg hover:bg-gray-100 transition"
        >
          <Bell size={20} className="text-gray-600" />

          {/* Notification Badge */}
          <span className="absolute top-1 right-1 w-2.5 h-2.5 
                           bg-red-500 rounded-full border-2 border-white">
          </span>
        </button>

        {/* Divider */}
        <div className="h-8 w-px bg-gray-200"></div>

        {/* User */}
        <button className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition">

          <UserCircle
            size={38}
            strokeWidth={1.5}
            className="text-[#0B1F3A]"
          />

          <div className="text-left">
            <p className="text-sm font-semibold text-gray-800">
              Admin
            </p>

            <p className="text-xs text-gray-500">
              Data Analyst
            </p>
          </div>

          <ChevronDown
            size={17}
            className="text-gray-400"
          />

        </button>

      </div>
    </header>
  );
}

export default Header;