import List from "@mui/material/List";
import { TodoItem } from "@/features/todos/components/TodoItem.tsx";
import type { Todo } from "@/features/todos/model/types.ts";

interface Props {
    todos: Todo[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, newText: string) => void;
}

export const TodoList: React.FC<Props> = ({ todos, onToggle, onDelete, onEdit }) => {
    return (
        <List>
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </List>
    );
};