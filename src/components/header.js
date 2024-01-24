"use client";
import { useTodoContext } from "@/context/todo-context";
import { useRouter } from "next/navigation";
import { useRef } from "react";

function Search() {
  const { setSearch } = useTodoContext();
  const inputRef = useRef(null);
  const router = useRouter();
  return (
    <div className="bg-secondary flex items-center p-[1.1rem] border-b border-gray-700 gap-5 col-start-2 col-end-7">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="34"
        viewBox="0 -960 960 960"
        width="34"
        className="border-2 p-1 rounded-full border-gray-400"
        onClick={() => inputRef.current.focus()}
      >
        <path
          fill="rgb(209 213 219)"
          d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"
        />
      </svg>
      <input
        type="text"
        placeholder="Search"
        className="bg-primary text-xl p-3 focus:outline-none text-gray-200 rounded-md "
        onChange={(e) => {
          setSearch(e.target.value);
          router.push("/search");
        }}
        ref={inputRef}
      />
    </div>
  );
}

export default Search;
