"use client";

import TaskForm from "../../components/TaskForm";

export default function CreatePage() {
    return (
        <div style={{ padding: "20px" }}>
            <h1>Создание задачи</h1>
            <TaskForm />
        </div>
    );
}
