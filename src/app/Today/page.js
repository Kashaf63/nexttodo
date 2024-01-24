import TaskShowingPage from "@/components/TaskShowingPage";
import { db } from "../../../db";
import Todos from "@/components/todos";
import AnimatePresence from "@/components/Conatiners/animate-presnece";
import FileHeading from "@/components/Headings/file-heading";

async function TodyTask() {
  const todos = await db.todo.findMany({});
  const todoArray = todos.map((todo) => {
    const currentDate = new Date();
    const targetDate = new Date(todo.targetedTime);

    const dayDiffrence = Math.round(
      (targetDate - currentDate) / (1000 * 60 * 60 * 24)
    );
    return {
      ...todo,
      timeDifference: dayDiffrence,
    };
  });

  const today = todoArray.filter((todo) => todo.timeDifference === 0);
  const todayinceomplete = today.filter((todo) => todo.completed === false);
  const todaycomplete = today.filter((todo) => todo.completed === true);

  return (
    <div className="main-wrapper">
      <div className="overflow-y-scroll h-[90vh] main-body relative">
        <div className="flex p-4 items-center gap-7 flex-col mt-5">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="34"
              viewBox="0 -960 960 960"
              width="34"
            >
              <path
                d="M440-800v-120h80v120h-80Zm0 760v-120h80v120h-80Zm360-400v-80h120v80H800Zm-760 0v-80h120v80H40Zm708-252-56-56 70-72 58 58-72 70ZM198-140l-58-58 72-70 56 56-70 72Zm564 0-70-72 56-56 72 70-58 58ZM212-692l-72-70 58-58 70 72-56 56Zm268 452q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-80q67 0 113.5-46.5T640-480q0-67-46.5-113.5T480-640q-67 0-113.5 46.5T320-480q0 67 46.5 113.5T480-320Zm0-160Z"
                fill="rgb(209 213 219)"
              />
            </svg>
            <FileHeading
              text={"Today"}
              className="text-5xl font-semibold text-white px-4 py-2"
            />
          </div>
          <ul
            className={
              todayinceomplete.length === 0
                ? "flex justify-center"
                : "grid grid-cols-4 gap-3"
            }
          >
            <AnimatePresence>
              {todayinceomplete.map((todo) => {
                return <Todos key={todo.id} todo={todo} path={`/${"Today"}`} />;
              })}
              {todayinceomplete.length === 0 && (
                <h2 className="text-2xl text-gray-500 font-semibold col-start-1 col-end-4">
                  Empty
                </h2>
              )}
            </AnimatePresence>
          </ul>
          <h2 className="text-3xl mt-7 text-white">Completed</h2>
          <ul
            className={
              todaycomplete.length === 0
                ? "flex justify-center"
                : "grid grid-cols-4 gap-3"
            }
          >
            <AnimatePresence>
              {todaycomplete.map((todo) => {
                return <Todos key={todo.id} todo={todo} path={`/${"Today"}`} />;
              })}
              {todaycomplete.length === 0 && (
                <h2 className="text-2xl text-gray-500 font-semibold col-start-1 col-end-4">
                  Empty
                </h2>
              )}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TodyTask;
