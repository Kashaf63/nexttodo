"use client";

import AnimatePresence from "@/components/Conatiners/animate-presnece";
import TaskShowingPage from "@/components/TaskShowingPage";
import Todos from "@/components/todos";
import { useTodoContext } from "@/context/todo-context";

function SearchPage() {
  const { result } = useTodoContext();

  return (
    <div className="main-wrapper" style={{ overflowY: "hidden" }}>
      <div
        className={`flex p-4 items-center gap-7 flex-col mt-5 ${
          !result ? "justify-center" : ""
        } h-full overflow-y-scroll main-body`}
      >
        <ul
          className={result ? "grid grid-cols-4 gap-3" : "flex justify-center"}
        >
          <AnimatePresence>
            {result ? (
              result.map((todo, idx) => {
                return (
                  <Todos
                    key={todo.id}
                    todo={todo}
                    mapIdx={idx}
                    type="searchRes"
                  />
                );
              })
            ) : (
              <div className="text-3xl text-gray-600">
                Sorry No Result Found
              </div>
            )}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}

export default SearchPage;
