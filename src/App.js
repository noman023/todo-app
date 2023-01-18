import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

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
    dispatch(addTodo(newTodo));
    setnewTodo("");
  };

  const handleChangeAdd = (e) => {
    setnewTodo(e.target.value);
  };

  const handleChangeEdit = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleClickUpdate = () => {
    dispatch(updateTodo({ id: idToEdit, title: editedTitle }));
    setIsEditSelected(!isEditSelected);
  };

  const renderedTodo = todos.map((todo) => (
    <main key={todo.id}>
      <h2>{todo.title}</h2>
      {todo.todoState ? <p>complete</p> : <p>incomplete</p>}

      <button onClick={() => handleClickEdit(todo.id, todo.title)}>edit</button>
      <button onClick={() => dispatch(deleteTodo(todo.id))}>delete</button>
    </main>
  ));

  return (
    <div style={{ margin: "1rem" }}>
      {isEditSelected ? (
        <>
          <input
            type={"text"}
            onChange={handleChangeEdit}
            value={editedTitle}
          />
          <button type="button" onClick={handleClickUpdate}>
            Update
          </button>
        </>
      ) : (
        <>
          <input
            type={"text"}
            placeholder={"add a todo..."}
            onChange={handleChangeAdd}
            value={newTodo}
          />
          <button type="button" onClick={handleClickAdd}>
            Add
          </button>
        </>
      )}

      {renderedTodo}
    </div>
  );
};

export default App;
