import { Task, Status } from "@/types/task";

const TASKS_KEY = "tasks";
const COUNTER_KEY = "taskCounter";

export function loadTasks(): Task[] {
    const saved = localStorage.getItem(TASKS_KEY);
    return saved ? (JSON.parse(saved) as Task[]) : [];
}

export function saveTasks(tasks: Task[]) {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

export function ensureDefaults(): Task[] {
    const tasks = loadTasks();
    if (tasks.length === 0) {
        const defaultTask: Task = {
            id: "RAZRABOTKA-1",
            title: "Пример задачи",
            description: "Это автоматически созданная задача для примера.",
            type: "Стандарт",
            status: Status.TODO,
        };
        saveTasks([defaultTask]);

        // Инициализируем счётчик, если не задан
        const cnt = Number(localStorage.getItem(COUNTER_KEY) || "1");
        if (cnt <= 1) localStorage.setItem(COUNTER_KEY, "2");
        return [defaultTask];
    }

    // Гарантируем, что счётчик >= (maxId + 1)
    const current = Number(localStorage.getItem(COUNTER_KEY) || "1");
    const maxIdNum = tasks.reduce((m, t) => {
        const mat = t.id.match(/RAZRABOTKA-(\d+)/);
        const num = mat ? parseInt(mat[1], 10) : 0;
        return Math.max(m, num);
    }, 0);
    const desired = Math.max(current, maxIdNum + 1);
    localStorage.setItem(COUNTER_KEY, String(desired));
    return tasks;
}

export function nextId(): string {
    const counter = Number(localStorage.getItem(COUNTER_KEY) || "1");
    const id = `RAZRABOTKA-${counter}`;
    localStorage.setItem(COUNTER_KEY, String(counter + 1));
    return id;
}

export function getTaskById(id: string): Task | undefined {
    return loadTasks().find((t) => t.id === id);
}

export function upsertTask(task: Task) {
    const tasks = loadTasks();
    const idx = tasks.findIndex((t) => t.id === task.id);
    if (idx >= 0) tasks[idx] = task;
    else tasks.push(task);
    saveTasks(tasks);
}

export function deleteTask(id: string) {
    const tasks = loadTasks().filter((t) => t.id !== id);
    saveTasks(tasks);
}
