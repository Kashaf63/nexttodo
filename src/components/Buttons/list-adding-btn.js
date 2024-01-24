"use client";
import { useTodoContext } from "@/context/todo-context";

function ListAddingBtn() {
  const { showTaskForm, setShowTaskForm, showTasks, setShowTasks } =
    useTodoContext();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="31"
      viewBox="0 -960 960 960"
      width="31"
      onClick={() => setShowTaskForm(!showTaskForm)}
      className="cursor-pointer"
    >
      <path
        d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"
        fill="rgb(209 213 219)"
      />
    </svg>
  );
}

export default ListAddingBtn;
