'use client';

import { useTodoContext } from "@/context/todo-context";
import { motion } from "framer-motion";

function ListsContainer({ children }) {
  const { showTasks } = useTodoContext();


  return (
    <>
      {showTasks ? (
        <motion.div
          className="flex flex-col gap-2"
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          transition={{ type: "tween", duration: 0.2 }}
        >
          {children}
        </motion.div>
      ) : null}
    </>
  );
}

export default ListsContainer;
