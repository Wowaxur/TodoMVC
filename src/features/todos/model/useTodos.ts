import { useState, useEffect } from "react";
import { db } from "@/firebase";
import { doc, onSnapshot, getDoc, updateDoc, setDoc } from "firebase/firestore";
import type {Todo} from "@/features/todos/model/types.ts";

export const useTodos = (userId: string | null) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) return;
        const userDocRef = doc(db, "todos", userId);
        setLoading(true);
        const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
            if (!snapshot.exists()) {
                setTodos([]);
                setLoading(false);
                return;
            }
            const data = snapshot.data();
            setTodos((data.tasks || []).map((task: Todo, idx: number) => ({
                ...task,
                id: task.id ?? String(idx),
            })));
            setLoading(false);
        });
        return () => unsubscribe();
    }, [userId]);

    // Типизация для массива задач
    type TodoArray = Todo[];

    // Добавить задачу
    const addTodo = async (text: string) => {
        if (!userId) return;
        const userDocRef = doc(db, "todos", userId);
        const todo: Todo = {
            id: crypto.randomUUID(),
            text,
            completed: false,
        };
        try {
            const docSnap = await getDoc(userDocRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                const tasks: TodoArray = Array.isArray(data.tasks) ? data.tasks : [];
                await updateDoc(userDocRef, {
                    tasks: [...tasks, todo],
                });
            } else {
                await setDoc(userDocRef, {
                    tasks: [todo],
                });
            }
        } catch (e) {
            console.error("Error adding todo:", e);
        }
    };

    // Переключить статус выполнения задачи
    const toggleTodo = async (id: string) => {
        if (!userId) return;
        const userDocRef = doc(db, "todos", userId);
        try {
            const docSnap = await getDoc(userDocRef);
            if (!docSnap.exists()) return;
            const data = docSnap.data();
            const tasks: TodoArray = Array.isArray(data.tasks) ? data.tasks : [];
            const updatedTasks = tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            );
            await updateDoc(userDocRef, { tasks: updatedTasks });
        } catch (e) {
            console.error("Error adding todo:", e);
        }
    };

    // Удалить задачу
    const deleteTodo = async (id: string) => {
        if (!userId) return;
        const userDocRef = doc(db, "todos", userId);
        try {
            const docSnap = await getDoc(userDocRef);
            if (!docSnap.exists()) return;
            const data = docSnap.data();
            const tasks: TodoArray = Array.isArray(data.tasks) ? data.tasks : [];
            const updatedTasks = tasks.filter((task) => task.id !== id);
            await updateDoc(userDocRef, { tasks: updatedTasks });
        } catch (e) {
            console.error("Error adding todo:", e);
        }
    };

    // Очистить все выполненные задачи
    const clearCompleted = async () => {
        if (!userId) return;
        const userDocRef = doc(db, "todos", userId);
        try {
            const docSnap = await getDoc(userDocRef);
            if (!docSnap.exists()) return;
            const data = docSnap.data();
            const tasks: TodoArray = Array.isArray(data.tasks) ? data.tasks : [];
            const updatedTasks = tasks.filter((task) => !task.completed);
            await updateDoc(userDocRef, { tasks: updatedTasks });
        } catch (e) {
            console.error("Error adding todo:", e);
        }
    };

    // Редактировать текст задачи
    const editTodo = async (id: string, newText: string) => {
        if (!userId) return;
        const userDocRef = doc(db, "todos", userId);
        try {
            const docSnap = await getDoc(userDocRef);
            if (!docSnap.exists()) return;
            const data = docSnap.data();
            const tasks: TodoArray = Array.isArray(data.tasks) ? data.tasks : [];
            const updatedTasks = tasks.map((task) =>
                task.id === id ? { ...task, text: newText } : task
            );
            await updateDoc(userDocRef, { tasks: updatedTasks });
        } catch (e) {
            console.error("Error adding todo:", e);
        }
    };

    return { todos, loading, addTodo, toggleTodo, deleteTodo, clearCompleted, editTodo };
};