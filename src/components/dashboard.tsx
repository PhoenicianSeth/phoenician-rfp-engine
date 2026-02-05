import { Search, Bell, TrendingUp, FileText, Clock } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const winRateData = [
  { value: 65 },
  { value: 68 },
  { value: 72 },
  { value: 70 },
  { value: 75 },
  { value: 78 },
  { value: 82 },
];

const recentActivity = [
  { id: 1, title: 'Proposal for City of Phoenix', status: 'Drafting', color: '#3B98C6', time: '2 hours ago' },
  { id: 2, title: 'Metro Transit Authority RFP', status: 'In Review', color: '#7C3AED', time: '5 hours ago' },
  { id: 3, title: 'State Infrastructure Project', status: 'Submitted', color: '#10b981', time: '1 day ago' },
];

export function Dashboard() {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="flex-1 ml-[260px] min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-8 py-10">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-3xl font-semibold text-[#001A38] tracking-tight">{getGreeting()}, Seth.</h1>
              <p className="text-gray-500 mt-1">Here's your RFP intelligence digest for today.</p>
            </div>

            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search proposals, documents..."
                  className="w-[400px] pl-11 pr-4 py-3 rounded-full bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition-all"
                />
              </div>

              {/* Notification Bell */}
              <button className="relative p-3 rounded-full hover:bg-gray-100 transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-[#7C3AED] rounded-full"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Win Rate */}
          <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Win Rate</p>
                <h3 className="text-3xl font-semibold text-[#001A38]">82%</h3>
              </div>
              <div className="p-3 bg-gradient-to-br from-[#3B98C6] to-[#0EA5E9] rounded-xl">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="h-12 w-full -mb-2">
              <ResponsiveContainer width="100%" height={48}>
                <LineChart data={winRateData}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3B98C6"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-green-600 mt-3 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +7% from last quarter
            </p>
          </div>

          {/* Active Proposals */}
          <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Active Proposals</p>
                <h3 className="text-3xl font-semibold text-[#001A38]">12</h3>
              </div>
              <div className="p-3 bg-gradient-to-br from-[#7C3AED] to-[#a855f7] rounded-xl">
                <FileText className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="space-y-2 mt-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Due This Week</span>
                <span className="font-semibold text-[#001A38]">3</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">In Review</span>
                <span className="font-semibold text-[#001A38]">5</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-medium">
                <Clock className="w-3 h-3" />
                2 Due Soon
              </span>
            </div>
          </div>

          {/* Tasks Pending */}
          <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Tasks Pending</p>
                <h3 className="text-3xl font-semibold text-[#001A38]">8</h3>
              </div>
              <div className="p-3 bg-gradient-to-br from-[#003A6E] to-[#001A38] rounded-xl">
                <Clock className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="space-y-3 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-sm text-gray-600">Review Phoenix docs</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                <span className="text-sm text-gray-600">Update Metro proposal</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-sm text-gray-600">Schedule review meeting</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
          <h2 className="text-xl font-semibold text-[#001A38] mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText className="w-5 h-5 text-[#003A6E]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#001A38] mb-1">{activity.title}</h4>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
                <span
                  className="px-4 py-2 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: activity.color }}
                >
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}