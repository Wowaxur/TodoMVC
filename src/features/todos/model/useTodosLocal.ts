import { useState } from "react";
import {Todo} from "@/features/todos/model/types.ts";



export const useTodosLocal = (initialTodos: Todo[] = []) => {
    const [todos, setTodos] = useState<Todo[]>(initialTodos);

    const addTodo = (text: string) => {
        setTodos([...todos, { id: Date.now().toString(), text, completed: false }]);
    };

    const toggleTodo = (id: string) => {
        setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const editTodo = (id: string, title: string) => {
        setTodos(todos.map(t => t.id === id ? { ...t, title } : t));
    };

    const deleteTodo = (id: string) => {
        setTodos(todos.filter(t => t.id !== id));
    };

    const clearCompleted = () => {
        setTodos(todos.filter(t => !t.completed));
    };

    return { todos, addTodo, toggleTodo, editTodo, deleteTodo, clearCompleted };
};