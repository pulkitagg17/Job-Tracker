import { useState, useEffect } from "react";
import api from "../utils/api";

export interface AnalyticsData {
  statusCounts: { _id: string; count: number }[];
  timeline: { _id: string; count: number }[];
}

export function useAnalytics() {
  const [data, setData] = useState<AnalyticsData>({
    statusCounts: [],
    timeline: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/jobs/analytics");
      console.log("Analytics API data:", res.data);
      setData(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch: fetchAnalytics };
}
