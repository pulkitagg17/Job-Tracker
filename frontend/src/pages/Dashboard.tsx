import { useState } from "react";
import { useJobs, type Job } from "../hooks/useJobs";
import KanbanBoard from "../components/KanbanBoard";
import JobDialog from "../components/JobDialog";
import { Plus } from "lucide-react";

export default function Dashboard() {
  const { jobs, loading, createJob, updateJob, deleteJob } = useJobs();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const handleCreate = () => {
    setEditingJob(null);
    setDialogOpen(true);
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setDialogOpen(true);
  };

  const handleSave = async (data: Partial<Job>, isEdit?: boolean) => {
    if (isEdit && editingJob) {
      await updateJob(editingJob._id, data);
    } else {
      await createJob(data);
    }
    setDialogOpen(false);
    setEditingJob(null);
  };

  const handleDelete = (job: Job) => {
    deleteJob(job._id);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-surface-light dark:bg-surface-dark">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Job Applications
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Track your job applications across different stages
            </p>
          </div>

          <button
            onClick={handleCreate}
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Add Job
          </button>
        </div>

        <JobDialog
          job={editingJob}
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onSave={handleSave}
        />

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-500 dark:text-gray-400">
              Loading your jobs...
            </div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-500 dark:text-gray-400 text-lg mb-4">
              No jobs yet! Add your first job application to get started.
            </div>
            <button
              onClick={handleCreate}
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm"
            >
              <Plus className="h-5 w-5" />
              Add Your First Job
            </button>
          </div>
        ) : (
          <KanbanBoard
            jobs={jobs}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onMove={(id, newStatus) => updateJob(id, { status: newStatus })}
          />
        )}
      </div>
    </div>
  );
}
