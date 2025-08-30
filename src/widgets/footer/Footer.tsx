import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import type { Filter } from "@/features/todos/model/types";

interface Props {
    count: number;
    filter: Filter;
    setFilter: (f: Filter) => void;
    clearCompleted: () => void;
}

export const Footer: React.FC<Props> = ({ count, filter, setFilter, clearCompleted }) => (
    <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2}>
        <Typography>{count} items left</Typography>
        <ButtonGroup>
            <Button variant={filter === "all" ? "contained" : "outlined"} onClick={() => setFilter("all")}>All</Button>
            <Button variant={filter === "active" ? "contained" : "outlined"} onClick={() => setFilter("active")}>Active</Button>
            <Button variant={filter === "completed" ? "contained" : "outlined"} onClick={() => setFilter("completed")}>Completed</Button>
        </ButtonGroup>
        <Button onClick={clearCompleted}>Clear completed</Button>
    </Stack>
);