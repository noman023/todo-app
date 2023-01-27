import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      const data = action.payload;

      const todo = {
        id: nanoid(),
        title: data,
        status: false,
      };

      state.push(todo);
    },
    deleteTodo: (state, action) => {
      const id = action.payload;

      return state.filter((todo) => todo.id !== id);
    },
    updateTodo: (state, action) => {
      const { id, title, status } = action.payload;
      const todoToUpdate = state.find((todo) => todo.id === id);

      if (todoToUpdate) {
        todoToUpdate.title = title ? title : todoToUpdate.title;

        todoToUpdate.status = status ? status : todoToUpdate.status;
      }
    },
  },
});

export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;
