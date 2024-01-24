"use client";
import { useTodoContext } from "@/context/todo-context";
import { motion } from "framer-motion";

function MainDropBtn() {
  const {showTasks, setShowTasks } =
    useTodoContext();
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      height="34"
      viewBox="0 -960 960 960"
      width="34"
      onClick={() => setShowTasks(!showTasks)}
      initial={{ rotate: "-90deg" }}
      animate={showTasks ? { rotate: "0deg" } : { rotate: "-90deg" }}
      transition={{ type: "tween", duration: 0.1 }}
    >
      <path
        d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"
        fill="rgb(209 213 219)"
      />
    </motion.svg>
  );
}

export default MainDropBtn;
