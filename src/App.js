import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styled from "./app.module.css";
import { addTodo, deleteTodo, updateTodo } from "./features/todo/todoSlice";

const App = () => {
  const [newTodo, setnewTodo] = useState("");
  const [isEditSelected, setIsEditSelected] = useState(false);
  const [idToEdit, setIdToEdit] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const handleClickEdit = (id, title) => {
    setIsEditSelected(!isEditSelected);
    setIdToEdit(id);
    setEditedTitle(title);
  };

  const handleClickAdd = () => {
    if (newTodo) {
      dispatch(addTodo(newTodo));
      setnewTodo("");
    }
  };

  const handleChangeAdd = (e) => {
    setnewTodo(e.target.value);
  };

  const handleChangeUpdate = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleClickUpdate = () => {
    dispatch(updateTodo({ id: idToEdit, title: editedTitle }));
    setIsEditSelected(!isEditSelected);
  };

  const renderedTodo = todos.map((todo) => (
    <section key={todo.id} className={styled.todoSection}>
      <h3>{todo.title}</h3>

      <button
        style={{ backgroundColor: "#298fcf", borderColor: "#298fcf" }}
        onClick={() => handleClickEdit(todo.id, todo.title)}
      >
        edit
      </button>
      <button
        style={{ backgroundColor: "#eb1111", borderColor: "#eb1111" }}
        onClick={() => dispatch(deleteTodo(todo.id))}
      >
        delete
      </button>
    </section>
  ));

  return (
    <main>
      <section className={styled.inputSection}>
        <input
          type={"text"}
          placeholder={"add a todo..."}
          onChange={isEditSelected ? handleChangeUpdate : handleChangeAdd}
          value={isEditSelected ? editedTitle : newTodo}
        />

        <button
          type="button"
          onClick={isEditSelected ? handleClickUpdate : handleClickAdd}
        >
          {isEditSelected ? "Update" : "Add"}
        </button>
      </section>

      {renderedTodo}
    </main>
  );
};

export default App;
