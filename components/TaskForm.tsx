"use client";

import React, { useState } from "react";
import { Status, Task } from "@/types/task";
import { useRouter } from "next/navigation";
import { nextId, loadTasks, saveTasks } from "@/lib/storage";

interface TaskFormProps {
    editMode?: boolean;
}

export default function TaskForm({ editMode }: TaskFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("Стандарт");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const tasks: Task[] = loadTasks();
        const newTask: Task = {
            id: nextId(),
            title,
            description,
            type,
            status: Status.TODO, // новые задачи начинаем в TODO
        };

        saveTasks([...tasks, newTask]);
        router.push("/");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Название задачи*</label>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Описание</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <label>Тип задачи</label>
                <input value={type} onChange={(e) => setType(e.target.value)} />
            </div>
            <div style={{ marginTop: "10px" }}>
                <button type="submit" className="primary">
                    {editMode ? "Сохранить" : "Создать задачу"}
                </button>
                <button type="button" className="danger" onClick={() => router.push("/")}>
                    Отмена
                </button>
            </div>
        </form>
    );
}
