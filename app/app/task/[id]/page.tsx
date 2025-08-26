"use client";

import { useParams } from "next/navigation";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import TaskForm from "../../../components/TaskForm";

export default function TaskPage() {
    const { id } = useParams();
    return (
        <div style={{ padding: "20px" }}>
            <h1>Задача {id}</h1>
            <TaskForm editMode />
        </div>
    );
}
