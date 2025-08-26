import { Task, Status } from "@/types/task";
import TaskCard from "./TaskCard";

interface ColumnProps {
    status: Status;
    tasks: Task[];
    moveTask: (id: string, status: Status) => void;
}

export default function Column({ status, tasks, moveTask }: ColumnProps) {
    return (
        <div className="column">
            <h2>{status}</h2>
            {tasks
                .filter((t) => t.status === status)
                .map((task) => (
                    <TaskCard key={task.id} task={task} moveTask={moveTask} />
                ))}
        </div>
    );
}
