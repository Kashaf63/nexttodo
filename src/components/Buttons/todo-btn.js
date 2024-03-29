"use client";

import { listfileDeletingAction } from "@/actions";
import { useTodoContext } from "@/context/todo-context";

function TodoBtn({ type, id, handleAdd, handleEdit, handleDelete }) {
  const { handleShowTodoAddingForm } = useTodoContext();
  if (type === "add") {
    return (
      <button
        className="rounded-lg duration-300"
        onClick={handleShowTodoAddingForm}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="27"
          viewBox="0 -960 960 960"
          width="27"
        >
          <path
            d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"
            fill="rgb(209 213 219)"
          />
        </svg>
      </button>
    );
  }

  if (type === "delete") {
    return (
      <button onClick={handleDelete}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path
            d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
            fill="rgb(239, 68, 68)"
          />
        </svg>
      </button>
    );
  }
  if (type === "edit") {
    return (
      <button onClick={handleEdit}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path
            d="M212.309-140.001q-30.308 0-51.308-21t-21-51.308v-535.382q0-30.308 21-51.308t51.308-21h346.23L498.54-760H212.309q-4.616 0-8.463 3.846-3.846 3.847-3.846 8.463v535.382q0 4.616 3.846 8.463 3.847 3.846 8.463 3.846h535.382q4.616 0 8.463-3.846 3.846-3.847 3.846-8.463v-288.77l59.999-59.998v348.768q0 30.308-21 51.308t-51.308 21H212.309ZM480-480Zm-99.999 99.999v-137.306l362.385-362.384q9.307-9.308 20.461-13.577 11.153-4.269 22.692-4.269 11.768 0 22.614 4.269t19.769 13.192l50.23 50.077q8.693 9.307 13.346 20.538 4.654 11.23 4.654 22.768 0 11.539-3.961 22.385-3.962 10.845-13.269 20.153L515.384-380.001H380.001Zm456.768-406.307-50.23-51.384 50.23 51.384ZM440-440h49.846l249.309-249.309-24.923-24.923-26.692-25.692L440-492.384V-440Zm274.232-274.232-26.692-25.692 26.692 25.692 24.923 24.923-24.923-24.923Z"
            fill="hsl(54, 78%, 58%)"
          />
        </svg>
      </button>
    );
  }
}

export default TodoBtn;
