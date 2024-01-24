import { db } from "../../db";
import FileRelatedBtn from "./Buttons/file-related-btn";
import TodoBtn from "./Buttons/todo-btn";
import AnimatePresence from "./Conatiners/animate-presnece";
import FormShowContainer from "./Conatiners/form-show-container";
import FileHeading from "./Headings/file-heading";
import Todos from "./todos";

async function TaskShowingPage({ definated, icon }) {
  const listFileIdObj = await db.listFile.findMany({
    where: {
      name: definated,
    },
    select: {
      id: true,
    },
  });
  const listFileId = listFileIdObj?.at(0)?.id;
  const todo = await db.todo.findMany({
    where: {
      listfileId: listFileId,
    },
  });

  const completedTodos = todo.filter((todo) => todo.completed);
  const incompletedTodos = todo.filter((todo) => !todo.completed);
  const showBtn =
    definated === "Inbox" ||
    definated === "Today" ||
    definated === "Someday" ||
    definated === "Overdue" ||
    definated === "Important";

  console.log(showBtn);

  return (
    <div className="overflow-y-scroll h-[90vh] main-body relative">
      <div className="absolute right-5 top-5 flex gap-3 items-center">
        <TodoBtn type="add" />
        {showBtn ? null : (
          <>
            <FileRelatedBtn listFileId={listFileId} type="edit" />
            <FileRelatedBtn listFileId={listFileId} type="delete" />
          </>
        )}
      </div>
      <div className="flex p-4 items-center gap-7 flex-col mt-5">
        <div className="flex items-center">
          {icon}
          <FileHeading
            text={definated}
            listFileId={listFileId}
            className="text-5xl font-semibold text-white px-4 py-2"
          />
        </div>
        <FormShowContainer listfileId={listFileId} />
        <ul
          className={
            incompletedTodos.length === 0
              ? "flex justify-center"
              : "grid grid-cols-4 gap-3"
          }
        >
          <AnimatePresence>
            {incompletedTodos.map((todo) => {
              return <Todos key={todo.id} todo={todo} path={`/${definated}`} />;
            })}
            {incompletedTodos.length === 0 && (
              <h2 className="text-2xl text-gray-500 font-semibold col-start-1 col-end-4">
                Empty
              </h2>
            )}
          </AnimatePresence>
        </ul>
        <h2 className="text-3xl mt-7 text-white">Completed</h2>
        <ul
          className={
            completedTodos.length === 0
              ? "flex justify-center"
              : "grid grid-cols-4 gap-3"
          }
        >
          <AnimatePresence>
            {completedTodos.map((todo) => {
              return <Todos key={todo.id} todo={todo} path={`/${definated}`} />;
            })}
            {completedTodos.length === 0 && (
              <h2 className="text-2xl text-gray-500 font-semibold col-start-1 col-end-4">
                Empty
              </h2>
            )}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}

export default TaskShowingPage;
