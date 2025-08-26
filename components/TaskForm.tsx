"use client";

import { useState } from "react";
import { Status, Task } from "@/types/task";
import { useRouter } from "next/navigation";

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

        // Получаем список задач из localStorage
        const saved = localStorage.getItem("tasks");
        const tasks: Task[] = saved ? JSON.parse(saved) : [];

        // Генерируем новый ID
        const newId = `RAZRABOTKA-${tasks.length + 1}`;

        // Создаём новую задачу
        const newTask: Task = {
            id: newId,
            title,
            description,
            type,
            status: Status.TODO, // новые задачи начинаем в TODO
        };

        // Добавляем в массив
        const updated = [...tasks, newTask];
        localStorage.setItem("tasks", JSON.stringify(updated));

        // Возврат на главную
        router.push("/");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Название задачи*</label>
                <input value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div>
                <label>Описание</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div>
                <label>Тип задачи</label>
                <input value={type} onChange={e => setType(e.target.value)} />
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
