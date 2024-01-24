"use client";

import { useTodoContext } from "@/context/todo-context";
import TodoBtn from "./Buttons/todo-btn";
import { changetodoStatus, todoEditAction } from "@/actions";
import { motion } from "framer-motion";
import { handleOnTodoDelete } from "@/actions";
import { useState } from "react";
import Form from "./Forms/form";

function Todos({ todo, path, type }) {
  const [showEditingForm, setShowEditingForm] = useState(false);
  const [status, setStaus] = useState(todo.completed);

  const editAction = async () => {
    setShowEditingForm(false);
    if (type === "searchRes")
      await todoEditAction(todo.id, showEditingForm, true);
    else await todoEditAction(todo.id, showEditingForm);
  };

  const handleCheckbox = async (e) => {
    setStaus(e.target.checked);
    await changetodoStatus(todo.id, e.target.checked, path);
  };

  const borderColor =
    todo.color === "bg-yellow-500/20"
      ? "rgb(252, 211, 77)" // Yellow color RGB value
      : todo.color === "bg-red-500/20"
      ? "rgb(239, 68, 68)" // Red color RGB value
      : todo.color === "bg-sky-500/20"
      ? "rgb(0, 191, 255)" // Sky color RGB value
      : todo.color === "bg-green-400/20"
      ? "rgb(16, 185, 129)" // Green color RGB value
      : "gray";

  console.log(todo.color);

  return (
    <motion.li
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0, opacity: 0.5 }}
      transition={{ type: "tween", duration: 0.5 }}
      style={{
        border:`1.4px solid ${borderColor}`
      }}
      className={`min-w-[16rem] text-white text-xl border border-gray-700 p-4 min-h-[10rem] ${todo.color} rounded-lg overflow-clip flex flex-col justify-between relative border`}
    >
      {showEditingForm ? (
        <Form
          formShowingFn={setShowEditingForm}
          id={todo.id}
          revalidate={{ revalidate: false, path: path }}
          type="update"
          className={"mb-4"}
          action={todoEditAction}
        >
          <Form.Textarea defaultValue={todo.content} />
          <Form.SubmitBtn>Save</Form.SubmitBtn>
        </Form>
      ) : (
        <p className="break-all mb-2">{todo.content}</p>
      )}

      <div className="flex justify-between gap-2 items-center">
        <input
          type="checkbox"
          className="accent-teal-400 h-[1.2rem] aspect-square rounded-md"
          checked={status}
          onChange={handleCheckbox}
        />
        <div className="flex gap-2   items-center">
          <time className="text-[0.8rem] font-normal italic">
            {todo.targetedTime}
          </time>
          <TodoBtn
            type="edit"
            id={todo.id}
            handleEdit={() => {
              setShowEditingForm((curr) => !curr);
            }}
          />
          <TodoBtn
            type="delete"
            id={todo.id}
            handleDelete={() => {
              if (type === "searchRes") handleOnTodoDelete(todo.id, true);
              else handleOnTodoDelete(todo.id, false);
            }}
          />
        </div>
      </div>
    </motion.li>
  );
}

export default Todos;
