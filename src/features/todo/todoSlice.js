import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = [
  {
    id: nanoid(),
    title: "First Todo",
    status: false,
  },
  {
    id: nanoid(),
    title: "Second Todo",
    status: true,
  },
];

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const data = action.payload;

      const todo = {
        title: data,
        id: nanoid(),
        status: false,
      };

      state.push(todo);
    },
    deleteTodo: (state, action) => {
      const id = action.payload;

      return state.filter((todo) => todo.id !== id);
    },
    updateTodo: (state, action) => {
      const { id, title } = action.payload;
      const todoToUpdate = state.find((todo) => todo.id === id);

      if (todoToUpdate) {
        todoToUpdate.title = title;
      }
    },
  },
});

export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;
