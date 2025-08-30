import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { TodoList } from "@/features/todos/components/TodoList";
import {useTodosLocal} from "@/features/todos/model/useTodosLocal.ts";
import {Todo} from "@/features/todos/model/types.ts";


jest.mock("@/features/todos/model/useTodosLocal");
const mockUseTodosLocal = useTodosLocal as jest.Mock;

describe("TodoList локально", () => {
    const todosMock: Todo[] = [
        { id: "1", text: "Первая задача", completed: false },
        { id: "2", text: "Вторая задача", completed: true },
    ];

    const toggleTodoMock = jest.fn();
    const deleteTodoMock = jest.fn();

    beforeEach(() => {
        mockUseTodosLocal.mockReturnValue({
            todos: todosMock,
            addTodo: jest.fn(),
            toggleTodo: toggleTodoMock,
            deleteTodo: deleteTodoMock,
            editTodo: jest.fn(),
            clearCompleted: jest.fn(),
        });
    });

    it("рендерит список задач", () => {
        render(
            <TodoList
                todos={todosMock}
                onToggle={toggleTodoMock}
                onDelete={deleteTodoMock}
                onEdit={jest.fn()}
            />
        );

        expect(screen.getByText("Первая задача")).toBeInTheDocument();
        expect(screen.getByText("Вторая задача")).toBeInTheDocument();
    });

    it("вызывает toggleTodo при клике на задачу", () => {
        render(
            <TodoList
                todos={todosMock}
                onToggle={toggleTodoMock}
                onDelete={deleteTodoMock}
                onEdit={jest.fn()}
            />
        );

        const firstTodoCheckbox = screen.getAllByRole("checkbox")[0];
        fireEvent.click(firstTodoCheckbox);

        expect(toggleTodoMock).toHaveBeenCalledWith("1");
    });

    it("вызывает deleteTodo при удалении", () => {
        render(
            <TodoList
                todos={todosMock}
                onToggle={toggleTodoMock}
                onDelete={deleteTodoMock}
                onEdit={jest.fn()}
            />
        );

        const deleteButtons = screen.getAllByRole("button", { name: /Удалить/i });
        fireEvent.click(deleteButtons[0]);

        expect(deleteTodoMock).toHaveBeenCalledWith("1");
    });
});