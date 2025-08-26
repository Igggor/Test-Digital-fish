"use client";

import { useState, useEffect } from "react";
import Column from "./Column";
import { Task, Status } from "@/types/task";
import "../styles/board.scss";
import Link from "next/link";

export default function Board() {
    const [tasks, setTasks] = useState<Task[]>([]);

    // Загружаем из localStorage
    useEffect(() => {
        const saved = localStorage.getItem("tasks");
        if (saved) {
            setTasks(JSON.parse(saved));
        }
    }, []);

    // Сохраняем при изменении
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const moveTask = (id: string, status: Status) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, status } : task));
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
