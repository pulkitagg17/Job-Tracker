import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { useAnalytics } from "../hooks/useAnalytics"; // You may need to create/use this hook
import { Loader2 } from "lucide-react";

// Example color mapping for statuses:
const STATUS_COLORS = {
  applied: "#3b82f6",
  interview: "#facc15",
  offer: "#22c55e",
  rejected: "#ef4444",
};

export default function Analytics() {
  const { data, loading, error } = useAnalytics();

  const totalJobs =
    data?.statusCounts?.reduce((sum, item) => sum + item.count, 0) || 0;
  const offerCount =
    data?.statusCounts?.find((s) => s._id === "offer")?.count || 0;
  const interviewCount =
    data?.statusCounts?.find((s) => s._id === "interview")?.count || 0;
  const rejectedCount =
    data?.statusCounts?.find((s) => s._id === "rejected")?.count || 0;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-surface-light dark:bg-surface-dark">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
          Analytics
        </h1>
        {loading ? (
          <div className="flex justify-center items-center h-52">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-card text-card-foreground border border-border shadow-soft rounded-lg flex flex-col items-center justify-center py-6">
                <div className="text-2xl font-bold">{totalJobs}</div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">
                  Total Jobs
                </div>
              </div>
              <div className="bg-card text-card-foreground border border-border shadow-soft rounded-lg flex flex-col items-center justify-center py-6">
                <div
                  className="text-2xl font-bold"
                  style={{ color: STATUS_COLORS.interview }}
                >
                  {interviewCount}
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">
                  Interviews
                </div>
              </div>
              <div className="bg-card text-card-foreground border border-border shadow-soft rounded-lg flex flex-col items-center justify-center py-6">
                <div
                  className="text-2xl font-bold"
                  style={{ color: STATUS_COLORS.offer }}
                >
                  {offerCount}
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">
                  Offers
                </div>
              </div>
              <div className="bg-card text-card-foreground border border-border shadow-soft rounded-lg flex flex-col items-center justify-center py-6">
                <div
                  className="text-2xl font-bold"
                  style={{ color: STATUS_COLORS.rejected }}
                >
                  {rejectedCount}
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">
                  Rejected
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* PieChart: Status Distribution */}
              <div className="bg-card border border-border rounded-lg shadow-soft p-4">
                <h2 className="text-lg font-semibold mb-4">
                  Status Distribution
                </h2>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={data.statusCounts}
                      dataKey="count"
                      nameKey="_id"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {data.statusCounts.map((entry) => (
                        <Cell
                          key={entry._id}
                          fill={
                            STATUS_COLORS[
                              entry._id as keyof typeof STATUS_COLORS
                            ]
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* BarChart: Status Bar */}
              <div className="bg-card border border-border rounded-lg shadow-soft p-4">
                <h2 className="text-lg font-semibold mb-4">Jobs by Status</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={data.statusCounts}>
                    <XAxis dataKey="_id" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="count">
                      {data.statusCounts.map((entry) => (
                        <Cell
                          key={entry._id}
                          fill={
                            STATUS_COLORS[
                              entry._id as keyof typeof STATUS_COLORS
                            ]
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* LineChart: Timeline (if available) */}
            {data.timeline?.length > 1 && (
              <div className="mt-8 bg-card border border-border rounded-lg shadow-soft p-4">
                <h2 className="text-lg font-semibold mb-4">
                  Applications Over Time
                </h2>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={data.timeline}>
                    <XAxis dataKey="_id" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#3b82f6"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Rate Cards */}
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              <div className="bg-card border border-border rounded-lg px-6 py-4 flex flex-col items-center">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Offer Rate
                </div>
                <div className="text-xl font-bold text-green-500">
                  {totalJobs
                    ? ((offerCount / totalJobs) * 100).toFixed(1)
                    : "0"}
                  %
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg px-6 py-4 flex flex-col items-center">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Interview Rate
                </div>
                <div className="text-xl font-bold text-yellow-400">
                  {totalJobs
                    ? ((interviewCount / totalJobs) * 100).toFixed(1)
                    : "0"}
                  %
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg px-6 py-4 flex flex-col items-center">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Rejection Rate
                </div>
                <div className="text-xl font-bold text-red-500">
                  {totalJobs
                    ? ((rejectedCount / totalJobs) * 100).toFixed(1)
                    : "0"}
                  %
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
