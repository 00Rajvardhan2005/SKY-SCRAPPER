import { useState } from "react";

import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";

import Dashboard from "./pages/dashboard";
import LiveFares from "./pages/LiveFares";
import Routes from "./pages/Routes";
import Airlines from "./pages/Airlines";
import Analytics from "./pages/Analytics";
import Alerts from "./pages/Alerts";
import RouteMap from "./pages/RouteMap";


function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "live-fares":
        return <LiveFares />;

      case "routes":
        return <Routes />;

      case "airlines":
        return <Airlines />

      case "analytics":
        return <Analytics />

      case "alerts":
        return <Alerts />

      case "route-map":
        return <RouteMap />;

      case "dashboard":
      default:
        alert(" Returned to Dashboard");
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FB]">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <div className="ml-[260px] min-h-screen">
        <Header />

        <main className="p-4 sm:p-6 lg:p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
