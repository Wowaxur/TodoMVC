import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {TodosPage} from "@/features/todos/ui/TodosPage.tsx";

const theme = createTheme();

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <TodosPage />
        </ThemeProvider>
    </React.StrictMode>
);