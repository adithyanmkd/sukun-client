import { FileText, Users, Eye, TrendingUp, Calendar } from "lucide-react";

const DashboardPage = () => {
  const stats = [
    {
      icon: FileText,
      label: "Total News",
      value: "248",
      change: "+12%",
      positive: true,
    },
    {
      icon: Eye,
      label: "Total Views",
      value: "45.2K",
      change: "+23%",
      positive: true,
    },
    {
      icon: Users,
      label: "Active Users",
      value: "3,842",
      change: "+8%",
      positive: true,
    },
    {
      icon: TrendingUp,
      label: "Engagement Rate",
      value: "68%",
      change: "-3%",
      positive: false,
    },
  ];

  const recentNews = [
    {
      id: 1,
      title: "Tech Innovator Reveals New Device",
      category: "Technology",
      views: "2.3K",
      date: "2024-01-15",
    },
    {
      id: 2,
      title: "Market Analysis: Q4 Results",
      category: "Business",
      views: "1.8K",
      date: "2024-01-14",
    },
    {
      id: 3,
      title: "Climate Summit Concludes",
      category: "Environment",
      views: "3.1K",
      date: "2024-01-13",
    },
    {
      id: 4,
      title: "Sports Championship Finals",
      category: "Sports",
      views: "4.2K",
      date: "2024-01-12",
    },
    {
      id: 5,
      title: "Healthcare Innovation Breakthrough",
      category: "Health",
      views: "1.5K",
      date: "2024-01-11",
    },
  ];

  const topCategories = [
    { name: "Technology", count: 45, percentage: 85 },
    { name: "Business", count: 38, percentage: 70 },
    { name: "Sports", count: 32, percentage: 60 },
    { name: "Health", count: 28, percentage: 52 },
    { name: "Environment", count: 22, percentage: 40 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-gray-600">
            Welcome back! Here's what's happening today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="rounded-lg bg-white p-6 shadow">
                <div className="mb-4 flex items-center justify-between">
                  <div className="rounded-lg bg-blue-50 p-3">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <span
                    className={`text-sm font-medium ${stat.positive ? "text-green-600" : "text-red-600"}`}
                  >
                    {stat.change}
                  </span>
                </div>
                <h3 className="mb-1 text-2xl font-bold text-gray-900">
                  {stat.value}
                </h3>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Recent News */}
          <div className="rounded-lg bg-white shadow lg:col-span-2">
            <div className="border-b border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Recent News
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentNews.map((news) => (
                  <div
                    key={news.id}
                    className="flex items-center justify-between border-b border-gray-100 py-3 last:border-0"
                  >
                    <div className="flex-1">
                      <h3 className="mb-1 font-medium text-gray-900">
                        {news.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="rounded bg-blue-50 px-2 py-1 text-blue-700">
                          {news.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {news.date}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 flex items-center gap-1 text-gray-600">
                      <Eye className="h-4 w-4" />
                      <span className="text-sm font-medium">{news.views}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Categories */}
          <div className="rounded-lg bg-white shadow">
            <div className="border-b border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Top Categories
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {topCategories.map((category, index) => (
                  <div key={index}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        {category.name}
                      </span>
                      <span className="text-sm text-gray-600">
                        {category.count} articles
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-blue-600 transition-all"
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Quick Actions
          </h2>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
              Add New Article
            </button>
            <button className="rounded-lg bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200">
              View Analytics
            </button>
            <button className="rounded-lg bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200">
              Manage Categories
            </button>
            <button className="rounded-lg bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200">
              Export Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
