import StatCards from "/src/Components/StatCards";
import AlertCard from "../Components/AlertCard";
import RouteCard from "../Components/RouteCard";
import FareCharts from "../Components/FareCharts";

function Dashboard() {
  return (
    <div className="space-y-6">

      {/* Page Introduction */}
      <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
        <h2 className="text-3xl font-bold text-[#0B1F3A]">
          Sky Scrapper Dashboard
        </h2>

        <p className="mt-2 text-gray-500">
          Real-Time Airfare Price Index
        </p>
      </div>

      {/* Statistics */}
      <StatCards />

      {/* Alerts + Routes */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <AlertCard />
        <RouteCard />
      </div>

      {/* Fare Chart */}
      <FareCharts />

    </div>
  );
}

export default Dashboard;