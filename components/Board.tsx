"use client";

import { useState, useEffect } from "react";
import Column from "./Column";
import { Task, Status } from "@/types/task";
import "../styles/board.scss";
import Link from "next/link";
import { ensureDefaults } from "@/lib/storage";

export default function Board() {
    const [tasks, setTasks] = useState<Task[]>([]);

    // Загружаем из localStorage/дефолты при маунте
    useEffect(() => {
        const loaded = ensureDefaults();
        setTasks(loaded);
    }, []);

    // Обновление статуса задачи
    const moveTask = (id: string, status: Status) => {
        setTasks((prev) => {
            const updated = prev.map((task) =>
                task.id === id ? { ...task, status } : task
            );
            // Сохраним в localStorage
            localStorage.setItem("tasks", JSON.stringify(updated));
            return updated;
        });
    };

    return (
        <div className="board">
            <h1>Задачи разработки</h1>
            <Link href="/create">
                <button className="primary">Новая задача</button>
            </Link>
            <div className="columns">
                <Column status={Status.TODO} tasks={tasks} moveTask={moveTask} />
                <Column status={Status.IN_PROGRESS} tasks={tasks} moveTask={moveTask} />
                <Column status={Status.DONE} tasks={tasks} moveTask={moveTask} />
            </div>
        </div>
    );
}
