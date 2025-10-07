import { useEffect, useState } from "react";
import api from "../utils/api";

export interface Job {
  _id: string;
  title: string;
  company: string;
  ctc?: number;
  dateOfDrive?: string;
  status: "applied" | "interview" | "offer" | "rejected";
  tags: string[];
  createdAt: string;
}

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await api.get("/jobs");
      setJobs(res.data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const createJob = async (data: Partial<Job>) => {
    try {
      const res = await api.post("/jobs", data);
      setJobs((prev) => [res.data, ...prev]);
    } catch (error) {
      console.error("Failed to create job:", error);
    }
  };

  const updateJob = async (id: string, newData: Partial<Job>) => {
    try {
      const res = await api.put(`/jobs/${id}`, newData);
      setJobs((prev) => prev.map((j) => (j._id === id ? res.data : j)));
    } catch (error) {
      console.error("Failed to update job:", error);
    }
  };

  const deleteJob = async (id: string) => {
    try {
      await api.delete(`/jobs/${id}`);
      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (error) {
      console.error("Failed to delete job:", error);
    }
  };

  return { jobs, loading, fetchJobs, createJob, updateJob, deleteJob };
}
