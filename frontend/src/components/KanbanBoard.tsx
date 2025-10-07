import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import type { Job } from "../hooks/useJobs";
import JobCard from "./JobCard";

type Status = "applied" | "interview" | "offer" | "rejected";

const STATUSES: { key: Status; title: string; color: string }[] = [
  {
    key: "applied",
    title: "Applied",
    color:
      "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800",
  },
  {
    key: "interview",
    title: "Interview",
    color:
      "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800",
  },
  {
    key: "offer",
    title: "Offer",
    color:
      "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800",
  },
  {
    key: "rejected",
    title: "Rejected",
    color: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800",
  },
];

interface KanbanProps {
  jobs: Job[];
  onEdit: (job: Job) => void;
  onDelete: (job: Job) => void;
  onMove: (id: string, newStatus: Status) => void;
}

export default function KanbanBoard({
  jobs,
  onEdit,
  onDelete,
  onMove,
}: KanbanProps) {
  const jobsByStatus: Record<Status, Job[]> = {
    applied: [],
    interview: [],
    offer: [],
    rejected: [],
  };

  for (const job of jobs) {
    if (jobsByStatus[job.status]) {
      jobsByStatus[job.status].push(job);
    }
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const targetStatus = destination.droppableId as Status;
    const job = jobs.find((j) => j._id === draggableId);
    if (job && job.status !== targetStatus) {
      onMove(job._id, targetStatus);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATUSES.map((status) => (
          <Droppable droppableId={status.key} key={status.key}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`
                border rounded-lg p-4 ${
                  status.color
                } min-h-[500px] transition-all duration-200
                ${snapshot.isDraggingOver ? "shadow-card bg-opacity-80" : ""}
                flex flex-col
              `}
                style={{
                  maxHeight: "550px",
                  overflowY: "auto",
                }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    {status.title}
                  </h3>
                  <span className="bg-background-light dark:bg-gray-800 rounded-full px-2 py-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                    {jobsByStatus[status.key].length}
                  </span>
                </div>

                {jobsByStatus[status.key].map((job, idx) => (
                  <Draggable key={job._id} draggableId={job._id} index={idx}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          opacity: snapshot.isDragging ? 0.7 : 1,
                        }}
                      >
                        <JobCard
                          job={job}
                          onEdit={onEdit}
                          onDelete={onDelete}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}

                {jobsByStatus[status.key].length === 0 && (
                  <div className="text-gray-400 dark:text-gray-500 text-center py-8 text-sm">
                    Drop jobs here or add new ones
                  </div>
                )}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
