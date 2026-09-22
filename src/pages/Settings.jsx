
import { useState } from "react";
import {
  UserCircle,
  Bell,
  Plane,
  Database,
  Monitor,
  KeyRound,
  Save,
  RotateCcw,
  CheckCircle2,
  Mail,
  Smartphone,
  ShieldCheck,
  Clock,
} from "lucide-react";

function Settings() {
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    name: "Admin",
    email: "admin@skyscrapper.com",
    role: "Data Analyst",

    emailAlerts: true,
    priceDropAlerts: true,
    priceRiseAlerts: false,
    systemAlerts: true,

    refreshInterval: "5 minutes",
    defaultRange: "7 Days",

    compactMode: false,
    darkMode: false,

    apiKey: "sk_live_xxxxxxxxxxxxxxxxx",
  });

  const updateSetting = (key, value) => {
    setSettings((previous) => ({
      ...previous,
      [key]: value,
    }));

    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const handleReset = () => {
    setSettings({
      name: "Admin",
      email: "admin@skyscrapper.com",
      role: "Data Analyst",

      emailAlerts: true,
      priceDropAlerts: true,
      priceRiseAlerts: false,
      systemAlerts: true,

      refreshInterval: "5 minutes",
      defaultRange: "7 Days",

      compactMode: false,
      darkMode: false,

      apiKey: "sk_live_xxxxxxxxxxxxxxxxx",
    });

    setSaved(false);
  };

  return (
    <div className="space-y-6">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#1565C0]">
              <Monitor size={24} />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#0B1F3A] sm:text-3xl">
                Settings
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Manage your SKY SCRAPPER preferences and monitoring settings.
              </p>
            </div>

          </div>

          {saved && (
            <div className="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2 text-sm font-medium text-green-600">
              <CheckCircle2 size={17} />
              Changes saved
            </div>
          )}

        </div>
      </div>

      {/* =====================================================
          PROFILE
      ===================================================== */}

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">

        <div className="border-b border-gray-100 p-5 sm:p-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-[#1565C0]">
              <UserCircle size={21} />
            </div>

            <div>
              <h3 className="font-bold text-[#0B1F3A]">
                Profile
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                Manage your account information.
              </p>
            </div>

          </div>

        </div>

        <div className="grid grid-cols-1 gap-5 p-5 sm:p-6 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
              Name
            </label>

            <input
              type="text"
              value={settings.name}
              onChange={(e) =>
                updateSetting("name", e.target.value)
              }
              className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
              Email
            </label>

            <input
              type="email"
              value={settings.email}
              onChange={(e) =>
                updateSetting("email", e.target.value)
              }
              className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
              Role
            </label>

            <div className="flex h-11 items-center rounded-lg border border-gray-200 bg-gray-50 px-4 text-sm text-gray-600">
              {settings.role}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
              Account Status
            </label>

            <div className="flex h-11 items-center gap-2 rounded-lg border border-green-100 bg-green-50 px-4 text-sm font-medium text-green-600">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Active
            </div>
          </div>

        </div>
      </div>

      {/* =====================================================
          NOTIFICATIONS
      ===================================================== */}

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">

        <div className="border-b border-gray-100 p-5 sm:p-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
              <Bell size={20} />
            </div>

            <div>
              <h3 className="font-bold text-[#0B1F3A]">
                Notifications
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                Choose which events should notify you.
              </p>
            </div>

          </div>

        </div>

        <div className="divide-y divide-gray-100">

          <ToggleSetting
            icon={Mail}
            title="Email Notifications"
            description="Receive important SKY SCRAPPER updates by email."
            checked={settings.emailAlerts}
            onChange={(value) =>
              updateSetting("emailAlerts", value)
            }
          />

          <ToggleSetting
            icon={Plane}
            title="Price Drop Alerts"
            description="Notify me when monitored fares decrease."
            checked={settings.priceDropAlerts}
            onChange={(value) =>
              updateSetting("priceDropAlerts", value)
            }
          />

          <ToggleSetting
            icon={Bell}
            title="Price Rise Alerts"
            description="Notify me when monitored fares increase."
            checked={settings.priceRiseAlerts}
            onChange={(value) =>
              updateSetting("priceRiseAlerts", value)
            }
          />

          <ToggleSetting
            icon={Smartphone}
            title="System Alerts"
            description="Receive alerts about data collection and system status."
            checked={settings.systemAlerts}
            onChange={(value) =>
              updateSetting("systemAlerts", value)
            }
          />

        </div>
      </div>

      {/* =====================================================
          AIRFARE MONITORING
      ===================================================== */}

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">

        <div className="border-b border-gray-100 p-5 sm:p-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
              <Plane size={20} />
            </div>

            <div>
              <h3 className="font-bold text-[#0B1F3A]">
                Airfare Monitoring
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                Configure how frequently airfare data is refreshed.
              </p>
            </div>

          </div>

        </div>

        <div className="grid grid-cols-1 gap-5 p-5 sm:p-6 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
              Refresh Interval
            </label>

            <div className="relative">

              <Clock
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <select
                value={settings.refreshInterval}
                onChange={(e) =>
                  updateSetting(
                    "refreshInterval",
                    e.target.value
                  )
                }
                className="h-11 w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:bg-white"
              >
                <option>1 minute</option>
                <option>5 minutes</option>
                <option>10 minutes</option>
                <option>15 minutes</option>
                <option>30 minutes</option>
              </select>

            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
              Default Analytics Range
            </label>

            <select
              value={settings.defaultRange}
              onChange={(e) =>
                updateSetting(
                  "defaultRange",
                  e.target.value
                )
              }
              className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:bg-white"
            >
              <option>7 Days</option>
              <option>30 Days</option>
              <option>90 Days</option>
            </select>
          </div>

        </div>
      </div>

      {/* =====================================================
          DISPLAY
      ===================================================== */}

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">

        <div className="border-b border-gray-100 p-5 sm:p-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
              <Monitor size={20} />
            </div>

            <div>
              <h3 className="font-bold text-[#0B1F3A]">
                Display Preferences
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                Customize how the dashboard appears.
              </p>
            </div>

          </div>

        </div>

        <div className="divide-y divide-gray-100">

          <ToggleSetting
            title="Compact Mode"
            description="Use smaller spacing for tables and dashboard cards."
            checked={settings.compactMode}
            onChange={(value) =>
              updateSetting("compactMode", value)
            }
          />

          <ToggleSetting
            title="Dark Mode"
            description="Use the dark interface across the dashboard."
            checked={settings.darkMode}
            onChange={(value) =>
              updateSetting("darkMode", value)
            }
          />

        </div>
      </div>

      {/* =====================================================
          API CONFIGURATION
      ===================================================== */}

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">

        <div className="border-b border-gray-100 p-5 sm:p-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
              <KeyRound size={20} />
            </div>

            <div>
              <h3 className="font-bold text-[#0B1F3A]">
                API Configuration
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                Manage the API credentials used for data services.
              </p>
            </div>

          </div>

        </div>

        <div className="p-5 sm:p-6">

          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
            API Key
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">

            <input
              type="password"
              value={settings.apiKey}
              onChange={(e) =>
                updateSetting("apiKey", e.target.value)
              }
              className="h-11 flex-1 rounded-lg border border-gray-200 bg-gray-50 px-4 font-mono text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:bg-white"
            />

            <button className="flex h-11 items-center justify-center gap-2 rounded-lg border border-gray-200 px-5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50">
              <ShieldCheck size={17} />
              Validate
            </button>

          </div>

          <p className="mt-3 text-xs text-gray-400">
            Keep your API credentials private. Never expose production
            keys in publicly accessible frontend code.
          </p>

        </div>
      </div>

      {/* =====================================================
          ACTIONS
      ===================================================== */}

      <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:items-center sm:justify-end">

        <button
          onClick={handleReset}
          className="flex h-11 items-center justify-center gap-2 rounded-lg border border-gray-200 px-5 text-sm font-semibold text-gray-600 transition hover:bg-gray-100"
        >
          <RotateCcw size={17} />
          Reset
        </button>

        <button
          onClick={handleSave}
          className="flex h-11 items-center justify-center gap-2 rounded-lg bg-[#1565C0] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          <Save size={17} />
          Save Changes
        </button>

      </div>

      {/* =====================================================
          SYSTEM STATUS
      ===================================================== */}

      <div className="flex flex-col gap-3 rounded-xl border border-green-100 bg-green-50 p-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-600">
            <CheckCircle2 size={19} />
          </div>

          <div>
            <p className="text-sm font-semibold text-green-700">
              System Online
            </p>

            <p className="text-xs text-green-600">
              Airfare data collection is currently active.
            </p>
          </div>

        </div>

        <span className="text-xs font-medium text-green-600">
          All services operational
        </span>

      </div>

    </div>
  );
}

/* =========================================================
   TOGGLE COMPONENT
========================================================= */

function ToggleSetting({
  icon: Icon,
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between gap-4 p-5 sm:p-6">

      <div className="flex min-w-0 items-center gap-3">

        {Icon && (
          <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-500 sm:flex">
            <Icon size={17} />
          </div>
        )}

        <div>
          <p className="text-sm font-semibold text-[#0B1F3A]">
            {title}
          </p>

          <p className="mt-1 text-xs leading-5 text-gray-500">
            {description}
          </p>
        </div>

      </div>

      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked
            ? "bg-[#1565C0]"
            : "bg-gray-300"
        }`}
      >

        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all ${
            checked
              ? "left-6"
              : "left-1"
          }`}
        />

      </button>

    </div>
  );
}

export default Settings;

