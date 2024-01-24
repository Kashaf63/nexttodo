import TaskShowingPage from "@/components/TaskShowingPage";
import { db } from "../../../db";
import AnimatePresence from "@/components/Conatiners/animate-presnece";
import Todos from "@/components/todos";
import FileHeading from "@/components/Headings/file-heading";
async function OverdueTask() {
  const todos = await db.todo.findMany({});
  const todoArray = todos.map((todo) => {
    const currentDate = new Date();
    const targetDate = new Date(todo.targetedTime);
    const timeDifference = targetDate - currentDate;
    const hoursDifference = Math.round(timeDifference / (1000 * 60 * 60));
    return {
      ...todo,
      hoursDifference: hoursDifference,
    };
  });

  const overdues = todoArray.filter(
    (todo) => todo.hoursDifference < 0 && todo.completed === false
  );


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
                d="M480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-800q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-440q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80Zm0-360Zm112 168 56-56-128-128v-184h-80v216l152 152ZM224-866l56 56-170 170-56-56 170-170Zm512 0 170 170-56 56-170-170 56-56ZM480-160q117 0 198.5-81.5T760-440q0-117-81.5-198.5T480-720q-117 0-198.5 81.5T200-440q0 117 81.5 198.5T480-160Z"
                fill="hsl(359, 65%, 62%)"
              />
            </svg>
            <FileHeading
              text={"Overdue"}
              // listFileId={listFileId}
              className="text-5xl font-semibold text-white px-4 py-2"
            />
          </div>
          <ul
            className={
              overdues.length === 0
                ? "flex justify-center"
                : "grid grid-cols-4 gap-3"
            }
          >
            <AnimatePresence>
              {overdues.map((todo) => {
                return (
                  <Todos key={todo.id} todo={todo} path={`/${"Overdue"}`} />
                );
              })}
              {overdues.length === 0 && (
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

export default OverdueTask;
