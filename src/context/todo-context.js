"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

export const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const [showTasks, setShowTasks] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showTasksSecondary, setShowTasksSecondary] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showSForm, setShowSForm] = useState(false);
  const [showEditingForm, setShowEditingForm] = useState(false);
  const [eachTodoId, setEachTodoId] = useState(null);
  const [showTodoAddingForm, setShowTodoAddingForm] = useState(false);
  const [openFileEditForm, setOpenFileEditForm] = useState(false);

  const [search, setSearch] = useState("");
  const [res, setRes] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch("/api/todos");
      const data = await res.json();
      setRes(data);
    };

    fetchTodos();
  }, [search]);

  const result = search
    ? res.filter((todo) => todo.content.includes(search))
    : null;

  const handleTodoEditFormOpen = (id) => {
    setEachTodoId(id);
    setShowEditingForm((curr) => !curr);
  };

  const handleShowTodoAddingForm = () => {
    setShowTodoAddingForm((curr) => !curr);
  };


  return (
    <TodoContext.Provider
      value={{
        showTasks,
        setShowTasks,
        showTaskForm,
        setShowTaskForm,
        showTasksSecondary,
        setShowTasksSecondary,
        showEdit,
        setShowEdit,
        showSForm,
        setShowSForm,
        setShowSForm,
        handleTodoEditFormOpen,
        showEditingForm,
        setShowEditingForm,
        eachTodoId,
        handleShowTodoAddingForm,
        showTodoAddingForm,
        openFileEditForm,
        setOpenFileEditForm,
        setSearch,
        result,
        setShowTodoAddingForm,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
// openFileEditForm;
export const useTodoContext = () => {
  const context = useContext(TodoContext);

  if (context === undefined) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }

  return context;
};

export default TodoProvider;
