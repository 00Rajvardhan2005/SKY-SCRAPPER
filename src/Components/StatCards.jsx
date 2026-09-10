// import {
//   TrendingUp,
//   IndianRupee,
//   Route,
//   Bell,
// } from "lucide-react";

// function StatCards() {
//   const stats = [
//     {
//       title: "Current APIx",
//       value: "124.6",
//       change: "+8.4%",
//       description: "vs last week",
//       icon: TrendingUp,
//       positive: false,
//     },
//     {
//       title: "Average Fare",
//       value: "₹6,842",
//       change: "+5.2%",
//       description: "vs last week",
//       icon: IndianRupee,
//       positive: false,
//     },
//     {
//       title: "Routes Tracked",
//       value: "248",
//       change: "+12",
//       description: "this month",
//       icon: Route,
//       positive: true,
//     },
//     {
//       title: "Active Alerts",
//       value: "18",
//       change: "6 high",
//       description: "priority alerts",
//       icon: Bell,
//       positive: false,
//     },
//   ];

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
//       {stats.map((stat, index) => {
//         const Icon = stat.icon;

//         return (
//           <div
//             key={index}
//             className="bg-white rounded-2xl border border-gray-100 
//                        p-6 shadow-sm hover:shadow-md transition-shadow"
//           >
//             {/* Top */}
//             <div className="flex items-center justify-between">
//               <p className="text-sm font-medium text-gray-500">
//                 {stat.title}
//               </p>

//               <div className="w-10 h-10 rounded-xl bg-blue-50 
//                               flex items-center justify-center">
//                 <Icon
//                   size={20}
//                   className="text-blue-600"
//                 />
//               </div>
//             </div>

//             {/* Value */}
//             <div className="mt-5">
//               <h2 className="text-3xl font-bold text-[#0B1F3A]">
//                 {stat.value}
//               </h2>
//             </div>

//             {/* Change */}
//             <div className="flex items-center gap-2 mt-3">
//               <span
//                 className={`text-sm font-semibold ${
//                   stat.positive
//                     ? "text-green-600"
//                     : "text-red-500"
//                 }`}
//               >
//                 {stat.change}
//               </span>

//               <span className="text-sm text-gray-400">
//                 {stat.description}
//               </span>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default StatCards;