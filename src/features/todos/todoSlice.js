import { createSlice } from "@reduxjs/toolkit";

const getInitialTodos = () => {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("todos");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Failed to load todos from localStorage:", e);
      return [];
    }
  }
  return [];
};

const saveTodosToStorage = (todos) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch (e) {
      console.error("Failed to save todos to localStorage:", e);
    }
  }
};

export const todoSlice = createSlice({
  name: "todos",
  initialState: getInitialTodos(),
  reducers: {
    setTodos: (state, action) => {
      saveTodosToStorage(action.payload);
      return action.payload;
    },
    addTodo: (state, action) => {
      const { title, description = "" } = action.payload;
      const maxId = state.reduce(
        (max, todo) => Math.max(max, Number(todo.id) || 0),
        0,
      );
      const newTodo = {
        id: maxId + 1,
        title: title?.trim() || "بدون عنوان",
        description: description?.trim() || "",
        isCompleted: false,
        createdAt: new Date().toISOString(),
      };
      state.push(newTodo);
      saveTodosToStorage(state);
    },
    toggleTodo: (state, action) => {
      const id =
        typeof action.payload === "object" ? action.payload.id : action.payload;
      const todo = state.find((t) => t.id === id);
      if (todo) {
        todo.isCompleted = !todo.isCompleted;
        saveTodosToStorage(state);
      }
    },
    deleteTodo: (state, action) => {
      const id =
        typeof action.payload === "object" ? action.payload.id : action.payload;
      const updated = state.filter((todo) => todo.id !== id);
      saveTodosToStorage(updated);
      return updated;
    },
    editTodo: (state, action) => {
      const { id, title, description } = action.payload;
      const todo = state.find((t) => t.id === id);
      if (todo) {
        if (title !== undefined) todo.title = title.trim();
        if (description !== undefined) todo.description = description.trim();
        saveTodosToStorage(state);
      }
    },
  },
});

export const { setTodos, addTodo, toggleTodo, deleteTodo, editTodo } =
  todoSlice.actions;

export const selectTodos = (state) => state.todos;

export default todoSlice.reducer;
