import { useState } from "react";
import TextField from "@mui/material/TextField";

interface Props {
    onAdd: (text: string) => void;
}

export const AddTodoInput: React.FC<Props> = ({ onAdd }) => {
    const [value, setValue] = useState("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && value.trim()) {
            onAdd(value.trim());
            setValue("");
        }
    };

    return (
        <TextField
            fullWidth
            variant="standard"
            placeholder="What needs to be done?"
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
        />
    );
};