import { Container, Typography, Paper } from "@mui/material";
import {AddTodoInput} from "@/features/todos/components/AddTodoInput.tsx";
import {TodoList} from "@/features/todos/components/TodoList.tsx";
import {Footer} from "@/widgets/footer/Footer.tsx";
import {TodosSkeleton} from "@/features/todos/ui/TodosSkeleton.tsx";
import {useUserId} from "@/features/todos/model/useUserId.ts";
import {useTodos} from "@/features/todos/model/useTodos.ts";

import React from "react";
import { Filter } from "@/features/todos/model/types.ts";


export const TodosPage = () => {
    const userId = useUserId();
    const { todos, loading, addTodo, toggleTodo, deleteTodo, clearCompleted, editTodo } = useTodos(userId);
    const [filter, setFilter] = React.useState<Filter>("all");

    if (!userId) return null;
    if (loading) return <TodosSkeleton />;

    const activeCount = todos.filter(t => !t.completed).length;

    let filteredTodos = todos;
    if (filter === "active") {
        filteredTodos = todos.filter(t => !t.completed);
    } else if (filter === "completed") {
        filteredTodos = todos.filter(t => t.completed);
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Typography variant="h2" align="center" color="text.secondary">todos</Typography>
            <Paper sx={{ p: 2, mt: 2 }}>
                <AddTodoInput onAdd={addTodo} />
                <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={editTodo} />
                <Footer count={activeCount} filter={filter} setFilter={setFilter} clearCompleted={clearCompleted} />
            </Paper>
        </Container>
    );
};