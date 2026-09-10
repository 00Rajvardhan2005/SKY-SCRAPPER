import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function FareCharts() {
  const fareData = [
    { day: "Mon", fare: 6200 },
    { day: "Tue", fare: 6450 },
    { day: "Wed", fare: 6320 },
    { day: "Thu", fare: 6780 },
    { day: "Fri", fare: 6950 },
    { day: "Sat", fare: 6840 },
    { day: "Sun", fare: 7120 },
  ];

  return (


    
    <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">

      {/* Header */}

<div> this is the farechart Page</div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-[#0B1F3A]">
            Average Airfare Trend
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Average domestic airfare over the last 7 days
          </p>
        </div>

        <select
          className="border border-gray-200 rounded-lg px-3 py-2
                     text-sm text-gray-600 bg-white outline-none
                     focus:border-blue-500"
        >
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 3 Months</option>
        </select>
      </div>

      {/* Chart */}
      <div className="w-full h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={fareData}
            margin={{
              top: 10,
              right: 20,
              left: 10,
              bottom: 10,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `₹${value / 1000}k`}
            />

            <Tooltip
              formatter={(value) => [
                `₹${value.toLocaleString("en-IN")}`,
                "Average Fare",
              ]}
            />

            <Line
              type="monotone"
              dataKey="fare"
              stroke="#2563EB"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default FareCharts;