import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import type { Todo } from "@/features/todos/model/types.ts";
import {useEffect, useRef, useState} from "react";
import TextField from "@mui/material/TextField";

interface Props {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, newText: string) => void;
}

export const TodoItem: React.FC<Props> = ({ todo, onToggle, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleDoubleClick = () => setIsEditing(true);

    const handleBlur = () => {
        if (editText.trim() && editText !== todo.text) {
            onEdit(todo.id, editText.trim());
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleBlur();
        else if (e.key === "Escape") {
            setEditText(todo.text);
            setIsEditing(false);
        }
    };

    return (
        <ListItem sx={{ textDecoration: todo.completed ? "line-through" : "none" }}>
            <Checkbox checked={todo.completed} onChange={() => onToggle(todo.id)} />
            {isEditing ? (
                <TextField
                    inputRef={inputRef}
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    size="small"
                    variant="standard"
                    fullWidth
                />
            ) : (
                <ListItemText primary={todo.text} onDoubleClick={handleDoubleClick} />
            )}
            <button onClick={() => onDelete(todo.id)}>Удалить</button>
        </ListItem>
    );
};