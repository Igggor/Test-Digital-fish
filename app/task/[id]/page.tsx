"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Status, Task } from "@/types/task";
import {
    getTaskById,
    upsertTask,
    deleteTask as removeTask,
} from "../../../lib/storage";

export default function TaskPage() {
    const params = useParams();
    const id = useMemo(() => (params?.id as string) || "", [params]);
    const router = useRouter();

    const [task, setTask] = useState<Task | null>(null);
    const [notFound, setNotFound] = useState(false);

    // Загружаем задачу
    useEffect(() => {
        if (!id) return;
        const t = getTaskById(id);
        if (!t) {
            setNotFound(true);
        } else {
            setTask(t);
        }
    }, [id]);

    const handleSave = () => {
        if (!task) return;
        upsertTask(task);
        router.push("/"); // вернёмся на доску
    };

    const handleDelete = () => {
        if (!task) return;
        const ok = confirm(`Удалить задачу ${task.id}?`);
        if (!ok) return;
        removeTask(task.id);
        router.push("/");
    };

    const setStatus = (status: Status) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setTask((prev: never) => (prev ? { ...prev, status } : prev));
    };

    if (notFound) {
        return (
            <div className="task-page">
                <div className="task-card-full">
                    <h2>Задача не найдена</h2>
                    <button onClick={() => router.push("/")} className="primary">
                        На главную
                    </button>
                </div>
            </div>
        );
    }

    if (!task) return null;

    return (
        <div className="task-page">
            <div className="task-card-full">
                <div className="task-card-full__header">
                    <div>
                        <div className="task-id">{task.id}</div>
                        <h2>Карточка задачи</h2>
                    </div>
                    <div className="header-actions">
                        <button onClick={handleSave} className="primary">
                            Сохранить
                        </button>
                        <button onClick={() => router.push("/")}>Назад</button>
                        <button onClick={handleDelete} className="danger">
                            Удалить
                        </button>
                    </div>
                </div>

                <div className="task-card-full__body">
                    <div className="form-row">
                        <label>Название*</label>
                        <input
                            value={task.title}
                            onChange={(e) =>
                                setTask((prev) => (prev ? { ...prev, title: e.target.value } : prev))
                            }
                            required
                        />
                    </div>

                    <div className="form-row">
                        <label>Описание</label>
                        <textarea
                            value={task.description}
                            onChange={(e) =>
                                setTask((prev) =>
                                    prev ? { ...prev, description: e.target.value } : prev
                                )
                            }
                        />
                    </div>

                    <div className="form-row inline">
                        <div>
                            <label>Тип</label>
                            <input
                                value={task.type}
                                onChange={(e) =>
                                    setTask((prev) => (prev ? { ...prev, type: e.target.value } : prev))
                                }
                            />
                        </div>

                        <div>
                            <label>Статус</label>
                            <select
                                value={task.status}
                                onChange={(e) => setStatus(e.target.value as Status)}
                            >
                                <option value={Status.TODO}>TODO</option>
                                <option value={Status.IN_PROGRESS}>IN_PROGRESS</option>
                                <option value={Status.DONE}>DONE</option>
                            </select>
                        </div>
                    </div>

                    <div className="status-actions">
                        <span>Быстрая смена статуса:</span>
                        <button
                            disabled={task.status === Status.TODO}
                            onClick={() => setStatus(Status.TODO)}
                        >
                            TODO
                        </button>
                        <button
                            disabled={task.status === Status.IN_PROGRESS}
                            onClick={() => setStatus(Status.IN_PROGRESS)}
                        >
                            В работу
                        </button>
                        <button
                            disabled={task.status === Status.DONE}
                            onClick={() => setStatus(Status.DONE)}
                        >
                            Сделано
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
