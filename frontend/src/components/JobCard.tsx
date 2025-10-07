import { useState } from "react";
import type { Job } from "../hooks/useJobs";

export default function JobCard({
  job,
  onEdit,
  onDelete,
}: {
  job: Job;
  onEdit: (job: Job) => void;
  onDelete: (job: Job) => void;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${job.title}"?`))
      return;
    setIsDeleting(true);
    try {
      await onDelete(job);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-soft bg-background-light dark:bg-surface-dark p-4 mb-3 hover:shadow-card transition-all duration-200">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-gray-100">
            {job.title}
          </h4>
          <p className="text-gray-600 dark:text-gray-400">{job.company}</p>
          {(job.ctc || job.dateOfDrive) && (
            <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              {job.ctc && <>CTC: ₹{job.ctc} LPA</>}
              {job.ctc && job.dateOfDrive && <> | </>}
              {job.dateOfDrive && (
                <>Drive: {new Date(job.dateOfDrive).toLocaleDateString()}</>
              )}
            </div>
          )}
        </div>
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            job.status === "applied"
              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
              : job.status === "interview"
              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
              : job.status === "offer"
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
          }`}
        >
          {job.status}
        </span>
      </div>
      {job.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {job.tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 text-xs rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className="flex gap-2 text-sm">
        <button
          className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
          onClick={() => onEdit(job)}
        >
          Edit
        </button>
        <button
          className={`font-medium ${
            isDeleting
              ? "text-gray-400 dark:text-gray-600"
              : "text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
          }`}
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
