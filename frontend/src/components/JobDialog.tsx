import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { Job } from "../hooks/useJobs";

interface JobDialogProps {
  job?: Job | null;
  open: boolean;
  onClose: () => void;
  onSave: (data: Partial<Job>, isEdit?: boolean) => void;
}

export default function JobDialog({
  job,
  open,
  onClose,
  onSave,
}: JobDialogProps) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [ctc, setCtc] = useState<number | undefined>(undefined);
  const [dateOfDrive, setDateOfDrive] = useState<string>("");
  const [status, setStatus] = useState<
    "applied" | "interview" | "offer" | "rejected"
  >("applied");
  const [tags, setTags] = useState("");

  const isEdit = !!job;

  useEffect(() => {
    if (job) {
      setTitle(job.title);
      setCompany(job.company);
      setCtc(job.ctc);
      setDateOfDrive(job.dateOfDrive ? job.dateOfDrive.substring(0, 10) : "");
      setStatus(job.status);
      setTags(job.tags.join(", "));
    } else {
      setTitle("");
      setCompany("");
      setCtc(undefined);
      setDateOfDrive("");
      setStatus("applied");
      setTags("");
    }
  }, [job]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      title,
      company,
      ctc,
      dateOfDrive,
      status,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    onSave(data, isEdit);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-card text-card-foreground border border-border p-6 rounded-lg shadow-elevated max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">
            {isEdit ? `Edit ${job?.title}` : "Add New Job"}
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-border rounded-lg transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Job Title *
            </label>
            <input
              className="w-full border border-border bg-background text-foreground p-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
              placeholder="Software Engineer"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Company *</label>
            <input
              className="w-full border border-border bg-background text-foreground p-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
              placeholder="Google"
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              CTC (in LPA)
            </label>
            <input
              className="w-full border border-border bg-background text-foreground p-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
              type="number"
              min="0"
              step="0.1"
              placeholder="Eg. 8.5"
              value={ctc ?? ""}
              onChange={(e) =>
                setCtc(e.target.value ? Number(e.target.value) : undefined)
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Date of Drive
            </label>
            <input
              className="w-full border border-border bg-background text-foreground p-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
              type="date"
              value={dateOfDrive}
              onChange={(e) => setDateOfDrive(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              className="w-full border border-border bg-background text-foreground p-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
            >
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tags</label>
            <input
              className="w-full border border-border bg-background text-foreground p-2 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
              placeholder="React, Node.js, Remote"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <p className="text-xs opacity-70 mt-1">Separate tags with commas</p>
          </div>
          <div className="flex gap-3 mt-2">
            <button
              type="submit"
              className="flex-1 bg-primary hover:opacity-90 text-primary-foreground rounded-lg px-4 py-2 font-medium transition-all"
            >
              {isEdit ? "Update Job" : "Add Job"}
            </button>
            <button
              type="button"
              className="px-4 py-2 border border-border rounded-lg hover:bg-card transition-colors"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
