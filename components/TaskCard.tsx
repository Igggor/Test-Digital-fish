import { Task, Status } from "@/types/task";
import Link from "next/link";

interface TaskCardProps {
    task: Task;
    moveTask: (id: string, status: Status) => void;
}

export default function TaskCard({ task, moveTask }: TaskCardProps) {
    return (
        <div className={`task-card ${task.status === Status.DONE ? "done" : ""}`}>
            <div className="task-id">{task.id}</div>
            <strong>{task.title}</strong>
            <p>{task.description}</p>
            <div className="actions">
                {task.status !== Status.TODO && (
                    <button onClick={() => moveTask(task.id, Status.TODO)}>TODO</button>
                )}
                {task.status !== Status.IN_PROGRESS && (
                    <button onClick={() => moveTask(task.id, Status.IN_PROGRESS)}>В работу</button>
                )}
                {task.status !== Status.DONE && (
                    <button onClick={() => moveTask(task.id, Status.DONE)}>Сделано</button>
                )}
                <Link href={`/task/${task.id}`}>
                    <button className="primary">Открыть</button>
                </Link>
            </div>
        </div>
    );
}
