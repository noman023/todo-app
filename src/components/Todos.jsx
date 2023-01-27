import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addTodo, deleteTodo, updateTodo } from "../features/todo/todoSlice";
import styled from "../app.module.css";

const Todos = () => {
  const [newTodo, setnewTodo] = useState("");
  const [isEditSelected, setIsEditSelected] = useState(false);
  const [idToEdit, setIdToEdit] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const handleClickEdit = (id, title) => {
    setIsEditSelected((prev) => !prev);
    setIdToEdit(id);
    setEditedTitle(title);
  };

  const handleChange = (e) => {
    if (isEditSelected) {
      setEditedTitle(e.target.value);
    } else {
      setnewTodo(e.target.value);
    }
  };

  const handleClick = () => {
    if (isEditSelected) {
      dispatch(updateTodo({ id: idToEdit, title: editedTitle }));
      setIsEditSelected(!isEditSelected);
    } else {
      dispatch(addTodo(newTodo));
      setnewTodo("");
    }
  };

  const renderedTodos = todos.map((todo) => (
    <section
      key={todo.id}
      className={styled.todoSection}
      style={todo.status ? { backgroundColor: "#f1f1f1" } : {}}
    >
      <input
        type={"checkbox"}
        onClick={() => dispatch(updateTodo({ id: todo.id, status: true }))}
        disabled={todo.status}
      />

      <h3 style={todo.status ? { color: "gray" } : {}}>{todo.title}</h3>

      <button
        style={
          !todo.status
            ? { backgroundColor: "#298fcf", borderColor: "#298fcf" }
            : { color: "gray", cursor: "default" }
        }
        onClick={() => handleClickEdit(todo.id, todo.title)}
        disabled={todo.status}
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
    <>
      <section className={styled.inputSection}>
        {todos.length === 0 ? (
          <p>
            It's seems like you are not making any progress. That's shame. Put
            something below there and walk towards your goal. Good luck !.
          </p>
        ) : (
          <p style={{ color: "green" }}>
            That's great. Keep going and complete the target(s). Don't be fed up
            if it's hard, nothing come easily.
          </p>
        )}

        <input
          type={"text"}
          placeholder={"add a todo..."}
          onChange={handleChange}
          value={isEditSelected ? editedTitle : newTodo}
        />

        <button type="button" onClick={handleClick}>
          {isEditSelected ? "Update" : "Add"}
        </button>
      </section>

      {renderedTodos}
    </>
  );
};

export default Todos;
